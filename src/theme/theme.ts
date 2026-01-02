import type { MantineColorsTuple } from '@mantine/core'
import { createTheme } from '@mantine/core'

// const paleViolet: MantineColorsTuple = [
//   '#f7ecff',
//   '#e7d6fb',
//   '#caaaf1',
//   '#ac7ce8',
//   '#9354e0',
//   '#833bdb',
//   '#7b2eda',
//   '#6921c2',
//   '#5d1cae',
//   '#501599'
// ]

const purple: MantineColorsTuple = [
  '#f3edff',
  '#e0d7fa',
  '#beabf0',
  '#9a7de6',
  '#7c55de',
  '#693cd9',
  '#5f30d8',
  '#4f23c0',
  '#461eac',
  '#3b1898'
]

export const theme = createTheme({
  primaryColor: 'theme',
  colors: { theme: purple },
  cursorType: 'pointer',
  activeClassName: ''
})
