import dayjs from 'dayjs'

export function currentDate(): string {
  return dayjs().format('YYYY-MM-DD')
}

export function currentYear(): string {
  return dayjs().format('YYYY')
}

export function currentDateTime(): string {
  return dayjs().toISOString()
}

export function ISO(date: string | dayjs.Dayjs): string {
  return dayjs(date).toISOString()
}

export function formatDateTime(date: string | dayjs.Dayjs): string {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

export function formatDate(date: string | dayjs.Dayjs): string {
  return dayjs(date).format('YYYY-MM-DD')
}

export function getYearStart(fromDate?: string | dayjs.Dayjs): string {
  return dayjs(fromDate).format('YYYY-01-01')
}

export function getYearEnd(fromDate?: string | dayjs.Dayjs): string {
  return dayjs(fromDate).format('YYYY-12-31')
}

export function getMonthStart(fromDate?: string | dayjs.Dayjs): string {
  return dayjs(fromDate).format('YYYY-MM-01')
}

export function getMonthEnd(fromDate?: string | dayjs.Dayjs): string {
  return dayjs(fromDate).endOf('month').format('YYYY-MM-DD')
}

export function getAcademicYearStart(fromDate?: string | dayjs.Dayjs): string {
  const date = dayjs(fromDate)
  let year = date.year()

  if (date.month() < 8) {
    year--
  }

  return `${year}-09-01`
}

export function getAcademicYearEnd(fromDate?: string | dayjs.Dayjs): string {
  const date = dayjs(fromDate)
  let year = date.year()

  if (date.month() >= 8) {
    year++
  }

  return `${year}-08-31`
}