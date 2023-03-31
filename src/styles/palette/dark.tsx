import { type PaletteOptions } from '@mui/material'
import { constantColors } from './constant'

export const paletteDark: PaletteOptions = {
  mode: 'dark',
  background: {
    default: '#0D1B2A',
    paper: '#192B3E'
  },
  text: {
    primary: '#D4E2F2',
    secondary: 'rgba(212,226,242,0.54)',
    disabled: 'rgba(212,226,242,0.38)'
  },
  ...constantColors
}
