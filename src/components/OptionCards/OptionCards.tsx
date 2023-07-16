import { Box, Card, Typography, useTheme, Icon } from '@mui/material'
import styles from './OptionCards.module.scss'
import { useMemo, useState } from 'react'
import { useStore } from 'src/utils/StoreProvider'

export interface Option<T> {
  text: string
  value: T
  icon: string
}

export interface Props<T> {
  options: Array<Option<T>>
  selected: T
  selectCallback: (value: T) => void
}

export const OptionCards = <T,>({ options, selectCallback, selected }: Props<T>): JSX.Element => {
  const theme = useTheme()
  const { themeStore } = useStore()

  const [selectedValue, setSelectedValue] = useState<T | null>(selected)

  const color = useMemo(() => {
    return themeStore.theme === 'light'
      ? theme.palette.primary.light
      : ''
  }, [themeStore.theme])

  const unselectedStyle = {
    border: themeStore.theme === 'light'
      ? '2px solid'
      : '',
    color
  }

  const selectedStyle = {
    backgroundColor: themeStore.theme === 'light'
      ? theme.palette.primary.light
      : theme.palette.primary.dark,
    color: themeStore.theme === 'light'
      ? theme.palette.background.default
      : ''
  }

  return <Box className={styles.cards_container}>
    {options.map((opt, idx) => <Card key={idx} className={styles.card}
      sx={
        selectedValue === opt.value
          ? selectedStyle
          : unselectedStyle
      } onClick={() => {
        setSelectedValue(opt.value)
        selectCallback(opt.value)
      }}>
      <Icon sx={{ fontSize: 50 }}>{opt.icon}</Icon>
      <Typography variant='body1'>{opt.text}</Typography>
    </Card>)}
  </Box>
}