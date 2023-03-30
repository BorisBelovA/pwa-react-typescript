import { type PaletteOptions } from '@mui/material'
import { constantColors } from './constant'

export const paletteLight: PaletteOptions = {
  background: {
    default: '#FFFBFF',
    paper: '#FFFFFF'
  },
  text: {
    primary: '#0d1b2a',
    secondary: 'rgba(13,27,42,0.54)',
    disabled: 'rgba(13,27,42,0.38)'
  },
  ...constantColors
}
