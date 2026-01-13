import type {
  CreateTimetableRequest,
  ListClassdaysApiResponse,
  ListClassroomsApiResponse,
  ListClasstimesApiResponse
} from '@/services/generatedApi.ts'
import { htmlParser } from '@/utils/htmlParser.ts'

interface Props {
  html: string,
  rooms: ListClassroomsApiResponse | undefined;
  days: ListClassdaysApiResponse | undefined;
  times: ListClasstimesApiResponse | undefined
}

export function parseTimetable({ html, rooms, days, times }: Props) {
  if (!rooms || !days || !times || !html) {
    throw new Error('Missing required data')
  }

  const doc = htmlParser.parse(html)
  const body = doc.body

  const tableCount = body.querySelectorAll('table').length
  if (tableCount !== 1) {
    throw new Error(`Found ${tableCount} tables`)
  }

  const tableRows = body.querySelectorAll('tr:not(:has(>td:first-child[colspan]))')
  if (tableRows.length < 2) {
    throw new Error(`Not enough rows`)
  }

  const dayId = getDayId(body.textContent, days)
  const [header, ...rows] = Array.from(tableRows)
  const [_, ...roomNames] = Array.from(header.querySelectorAll('td'))

  const height = rows.length
  const width = roomNames.length
  const grid: (string | null)[][] = Array.from({ length: height }, () => Array(width).fill(null))
  const rowTimes: string[] = []

  for (let r = 0; r < height; r++) {
    const row = rows[r]
    const tds = Array.from(row.querySelectorAll('td'))

    if (tds.length > 0) {
      rowTimes[r] = tds[0].textContent.trim()
    }

    let tdIndex = 1

    for (let c = 0; c < width; c++) {
      if (grid[r][c] !== null) {
        continue
      }

      if (tdIndex >= tds.length) {
        break
      }

      const td = tds[tdIndex]
      const rowSpan = parseInt(td.getAttribute('rowspan') || '1', 10)
      const colSpan = parseInt(td.getAttribute('colspan') || '1', 10)

      const className = td.textContent
        .replaceAll('/', ' / ')
        .replace(/\s+/g, ' ')
        .replace(/-{2,}/g, '-----')
        .replace(/(?<=\p{L})-(?=\p{L})/gu, '')
        .trim()

      for (let i = 0; i < rowSpan; i++) {
        for (let j = 0; j < colSpan; j++) {
          const targetR = r + i
          const targetC = c + j

          if (targetR < height && targetC < width) {
            grid[targetR][targetC] = className
          }
        }
      }

      tdIndex++
    }
  }

  const data: CreateTimetableRequest[] = []

  for (let r = 0; r < height; r++) {
    const timeText = rowTimes[r]
    // if (!timeText.length) {
    //   // ignore row without time
    //   continue
    // }
    const timeId = getTimeId(timeText, times)

    for (let c = 0; c < width; c++) {
      const className = grid[r][c]

      if (!className) {
        continue
      }

      data.push({
        className,
        dayId,
        timeId,
        roomId: getRoomId(roomNames[c].textContent, rooms),
      })
    }
  }

  return data
}

function getDayId(body: string, days: ListClassdaysApiResponse) {
  const lowerBody = body.toLowerCase()
  const foundDays: number[] = []

  for (const day of days) {
    if (lowerBody.includes(day.name.toLowerCase())) {
      foundDays.push(day.id)
    }
  }

  if (foundDays.length !== 1) {
    throw new Error(`Found ${foundDays.length} days matching`)
  }

  return foundDays[0]
}

function getTimeId(timeName: string, times: ListClasstimesApiResponse) {
  const timeNumber = parseInt(timeName, 10)

  for (const time of times) {
    if (time.id === timeNumber) {
      return time.id
    }
  }

  throw new Error(`Could not find time '${timeName}'`)
}

function getRoomId(roomName: string, rooms: ListClassroomsApiResponse) {
  const roomNameNormalized = normalizeClassroomName(roomName)

  for (const room of rooms) {
    if (roomNameNormalized === normalizeClassroomName(room.name)) {
      return room.id
    }
  }

  throw new Error(`Could not find room '${roomName}'`)
}

function normalizeClassroomName(name: string) {
  return name
    .replaceAll(/kl(?:\.|asė)/gi, '')
    .replaceAll(/\(\d+?\)/gi, '')
    .replaceAll(/\s/g, '')
    .toUpperCase()
}