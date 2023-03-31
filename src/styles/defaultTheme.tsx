import { type PaletteMode, type Theme } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { typography } from './typography'
import { components } from './components'
import { shadows } from './shadows'
import { paletteDark } from './palette/dark'
import { paletteLight } from './palette/light'

export const getTheme = (mode: PaletteMode): Theme => {
  return mode === 'dark'
    ? darkTheme
    : defaultTheme
}

const darkTheme = createTheme({
  palette: paletteDark,
  typography,
  components,
  shape: {
    borderRadius: 8
  },
  shadows
})

export const defaultTheme = createTheme({
  palette: paletteLight,
  typography,
  components,
  shape: {
    borderRadius: 8
  },
  shadows
})
