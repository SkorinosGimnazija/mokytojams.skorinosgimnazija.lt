import { parseCalendarEvent } from '@/pages/cms/events/parseCalendarEvent.ts'
import type { CreateCalendarEventRequest } from '@/services/generatedApi.ts'
import { formatDate, ISO } from '@/utils/dateUtils.ts'
import { htmlParser } from '@/utils/htmlParser.ts'

interface Props {
  html: string
}

const MONTH_MAP: Record<string, number> = {
  'sausis': 1,
  'sausio': 1,
  'vasaris': 2,
  'vasario': 2,
  'kovas': 3,
  'kovo': 3,
  'balandis': 4,
  'balandžio': 4,
  'balandzio': 4,
  'gegužė': 5,
  'gegužės': 5,
  'geguze': 5,
  'geguzes': 5,
  'birželis': 6,
  'birželio': 6,
  'birzelis': 6,
  'birzelio': 6,
  'liepa': 7,
  'liepos': 7,
  'rugpjūtis': 8,
  'rugpjūčio': 8,
  'rugpjutis': 8,
  'rugpjucio': 8,
  'rugsėjis': 9,
  'rugsėjo': 9,
  'rugsejis': 9,
  'rugsejo': 9,
  'spalis': 10,
  'spalio': 10,
  'lapkritis': 11,
  'lapkričio': 11,
  'lapkricio': 11,
  'gruodis': 12,
  'gruodžio': 12,
  'gruodzio': 12,
}

function extractYearAndMonth(text: string): { year: number; month: number } {
  let foundMonth: number | undefined
  const lowerText = text.toLowerCase()

  for (const [name, num] of Object.entries(MONTH_MAP)) {
    const regex = new RegExp(`(?:^|[^\\p{L}])${name}(?:[^\\p{L}]|$)`, 'iu')
    if (regex.test(lowerText)) {
      foundMonth = num
      break
    }
  }

  if (!foundMonth) {
    throw new Error('Nepavyko nustatyti mėnesio')
  }

  const academicYearMatch = lowerText.match(/(\d{4})\s*[/–-]\s*(\d{4})/)
  if (academicYearMatch) {
    const y1 = parseInt(academicYearMatch[1], 10)
    const y2 = parseInt(academicYearMatch[2], 10)
    const year = foundMonth >= 9 ? y1 : y2
    return { year, month: foundMonth }
  }

  const singleYearMatch = lowerText.match(/(\d{4})/)
  if (singleYearMatch) {
    const year = parseInt(singleYearMatch[1], 10)
    return { year, month: foundMonth }
  }

  throw new Error('Nepavyko nustatyti metų')
}

function isDaysRow(row: Element): boolean {
  const cells = Array.from(row.querySelectorAll('td, th'))
  if (cells.length === 0) return false

  let hasDayNumber = false
  for (const cell of cells) {
    const text = cell.textContent?.trim() || ''
    if (!text) continue

    const num = parseInt(text, 10)
    if (String(num) === text && num >= 1 && num <= 31) {
      hasDayNumber = true
    } else {
      return false
    }
  }

  return hasDayNumber
}

function extractDayColumns(row: Element): (number | null)[] {
  const cells = Array.from(row.querySelectorAll('td, th'))
  const columns: (number | null)[] = []
  for (const cell of cells) {
    const colspan = parseInt(cell.getAttribute('colspan') || '1', 10) || 1
    const text = cell.textContent?.trim() || ''
    const dayNum = parseInt(text, 10)
    const validDay = !isNaN(dayNum) && dayNum >= 1 && dayNum <= 31 ? dayNum : null
    for (let k = 0; k < colspan; k++) {
      columns.push(k === 0 ? validDay : null)
    }
  }
  return columns
}

function findNextDayNumber(rows: Element[], startIndex: number): number | null {
  for (let i = startIndex; i < rows.length; i++) {
    if (isDaysRow(rows[i])) {
      const dayColumns = extractDayColumns(rows[i])
      const firstDay = dayColumns.find(d => d != null)
      if (firstDay != null) return firstDay
    }
  }
  return null
}

function findPrevDayNumber(rows: Element[], startIndex: number): number | null {
  for (let i = startIndex; i >= 0; i--) {
    if (isDaysRow(rows[i])) {
      const dayColumns = extractDayColumns(rows[i])
      const firstDay = dayColumns.find(d => d != null)
      if (firstDay != null) return firstDay
    }
  }
  return null
}

export function parseCalendarEvents({ html }: Props): CreateCalendarEventRequest[] {
  if (!html) {
    throw new Error('Missing required data')
  }

  const doc = htmlParser.parse(html)
  const body = doc.body

  const tables = body.querySelectorAll('table')
  if (tables.length === 0) {
    throw new Error('Nerasta lentelių')
  }

  const headerText = Array.from(body.children)
    .filter(el => el.tagName !== 'TABLE')
    .map(el => el.textContent)
    .join(' ')

  const { year, month } = extractYearAndMonth(headerText || body.textContent || '')

  const events: CreateCalendarEventRequest[] = []

  const addEventItems = (cellText: string, startDateStr: string, endDateStr: string) => {
    const eventItems = cellText
      .split(/-{5,}/)
      .map(t => t.trim())
      .filter(Boolean)

    for (const itemText of eventItems) {
      if (!itemText) continue
      const parsed = parseCalendarEvent({ text: itemText, date: startDateStr })
      const isExplicitRange = parsed.startDate !== parsed.endDate
      events.push({
        title: parsed.title,
        allDay: parsed.allDay,
        startDate: parsed.allDay
          ? formatDate(isExplicitRange ? parsed.startDate : startDateStr)
          : ISO(parsed.startDate),
        endDate: parsed.allDay
          ? formatDate(isExplicitRange ? parsed.endDate : endDateStr)
          : ISO(parsed.endDate),
      })
    }
  }

  for (const table of Array.from(tables)) {
    const rows = Array.from(table.querySelectorAll('tr'))
    let currentDaysColumns: (number | null)[] = []

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]

      if (isDaysRow(row)) {
        currentDaysColumns = extractDayColumns(row)
      } else {
        const cells = Array.from(row.querySelectorAll('td, th'))
        const hasText = cells.some(cell => cell.textContent?.trim())
        if (!hasText) continue

        let colIndex = 0
        for (const cell of cells) {
          const colspan = parseInt(cell.getAttribute('colspan') || '1', 10) || 1
          const cellText = cell.textContent || ''

          if (cellText.trim()) {
            const days: number[] = []
            for (let offset = 0; offset < colspan; offset++) {
              const day = currentDaysColumns[colIndex + offset]
              if (day != null) {
                days.push(day)
              }
            }

            if (days.length > 0) {
              const startDay = days[0]
              const endDay = days[days.length - 1]
              const startDateStr = `${year}-${String(month).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`
              const endDateStr = `${year}-${String(month).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`
              addEventItems(cellText, startDateStr, endDateStr)
            } else {
              const dayNum = findNextDayNumber(rows, i + 1) ?? findPrevDayNumber(rows, i - 1) ?? 1
              const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
              addEventItems(cellText, dateStr, dateStr)
            }
          }

          colIndex += colspan
        }
      }
    }
  }

  return events
}