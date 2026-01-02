import type { ComboboxItem, OptionsFilter } from '@mantine/core'

const ltMap: Record<string, string> = {
  'Ą': 'A', 'Č': 'C', 'Ę': 'E', 'Ė': 'E', 'Į': 'I', 'Š': 'S', 'Ų': 'U', 'Ū': 'U', 'Ž': 'Z'
}

export function normalizeLithuanian(text: string): string {
  return text.toUpperCase().replace(/[ĄČĘĖĮŠŲŪŽ]/g, char => ltMap[char] || char)
}

type NormalizedComboboxItem = ComboboxItem & { normalizedName: string }

export const lithuanianSearchFilter: OptionsFilter = ({ options, search }) => {
  const splitSearch = normalizeLithuanian(search).trim().split(' ')

  return (options as NormalizedComboboxItem[]).filter((option) => {
    const words = option.normalizedName.split(' ')
    return splitSearch.every((searchWord) => words.some((word) => word.includes(searchWord)))
  })
}

export const disabledSearchFilter: OptionsFilter = ({ options }) => {
  return options
}