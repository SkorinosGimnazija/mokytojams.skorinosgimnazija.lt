import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { MoonIcon, SunIcon } from '@phosphor-icons/react'
import React from 'react'

export function ToggleThemeButton() {
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true })
  const isLight = computedColorScheme === 'light'

  const toggleTheme = () => {
    setColorScheme(isLight ? 'dark' : 'light')
  }

  return (
    <ActionIcon variant="default" size={36} onClick={toggleTheme}>
      {isLight ? <MoonIcon size={26}/> : <SunIcon size={26}/>}
    </ActionIcon>
  )
}