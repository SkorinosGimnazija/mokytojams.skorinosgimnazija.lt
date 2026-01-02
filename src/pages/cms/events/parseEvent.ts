import { formatDate, formatDateTime } from '@/utils/dateUtils.ts'
import dayjs from 'dayjs'

interface Props {
  text: string,
  date: string
}

const startTimeRegex = /^(\d{1,2})[.:](\d{2})\s?val\.\s?[-–]?\s?(.*)$/
const startEndTimeRegex = /^(\d{1,2})[.:](\d{2})\s?[-–]\s?(\d{1,2})[.:](\d{2})\s?val\.\s?[-–]?\s?(.*)$/
const startDateRegex = /^(\d{1,2})\s?d\.\s?[-–]?\s?(.*)$/
const startEndDateRegex = /^(\d{1,2})[-–](\d{1,2})\s?d\.\s?[-–]?\s?(.*)$/

export function parseEvent({ text, date }: Props) {
  if (!text?.length || !date?.length) {
    throw new Error('Missing required data')
  }

  const baseDate = dayjs(date)
  const normalizedText = text
    .replace(/\s+/g, ' ') // remove double spaces
    .replace(/-{5,}/g, ' ') // remove day split
    .replace(/,,/g, '„') // replace 2 commas with a proper symbol
    .replace(/\sAts\..*$/, '')  // remove "Ats."*
    .replace(/(?<!kl)\.\s*$/, '')  // remove end dot if its not "kl."
    .trim()

  let match = startEndTimeRegex.exec(normalizedText)
  if (match) {
    const [, startH, startM, endH, endM, title] = match

    const startDate = formatDateTime(baseDate
      .set('hour', +startH)
      .set('minute', +startM))

    const endDate = formatDateTime(baseDate
      .set('hour', +endH)
      .set('minute', +endM))

    return { title, startDate, endDate, allDay: false }
  }

  match = startTimeRegex.exec(normalizedText)
  if (match) {
    const [, startH, startM, title] = match

    const startDate = formatDateTime(baseDate
      .set('hour', +startH)
      .set('minute', +startM))

    const endDate = formatDateTime(baseDate
      .set('hour', +startH + 1) // default +1h
      .set('minute', +startM))

    return { title, startDate, endDate, allDay: false }
  }

  match = startEndDateRegex.exec(normalizedText)
  if (match) {
    const [, startDay, endDay, title] = match

    const startDate = formatDate(baseDate
      .set('date', +startDay))

    const endDate = formatDate(baseDate
      .set('date', +endDay))

    return { title, startDate, endDate, allDay: true }
  }

  match = startDateRegex.exec(normalizedText)
  if (match) {
    const [, startDay, title] = match

    const startDate = formatDate(baseDate
      .set('date', +startDay))

    return { title, startDate, endDate: startDate, allDay: true }
  }

  const fallbackDate = formatDate(baseDate)
  return { title: normalizedText, startDate: fallbackDate, endDate: fallbackDate, allDay: true }
}