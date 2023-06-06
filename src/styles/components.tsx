import { type Components, type Theme } from '@mui/material'
import { constantColors } from './palette/constant'

export const components: Components<Omit<Theme, 'components'>> = {
  MuiButton: {
    styleOverrides: {
      contained: {
        color: 'white'
      },
      root: {
        fontSize: '1rem',
        fontWeight: 600,
        borderRadius: '5rem',
        textTransform: 'none'
      },
      containedPrimary: {
        color: 'white'
      }
    }
  },
  MuiPaper: {
    styleOverrides: {
      root: {
      }
    }
  },
  MuiToggleButton: {
    styleOverrides: {
      root: {
        borderColor: constantColors.primaryLight?.main,
        padding: '.25rem 1rem',
        textTransform: 'none',
        textSize: '1rem',
        '&.Mui-selected': {
          borderColor: constantColors.primary
        }
      }
    }
  }
}
