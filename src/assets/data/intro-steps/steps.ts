import { t } from '@lingui/macro'
import { type PaletteMode } from '@mui/material'
import { type Step } from 'intro.js-react'

export const defaultStepsOptions = () => ({
  hidePrev: true,
  buttonClass: 'intro-buttons',
  disableInteraction: true,
  showBullets: false,
  nextLabel: t`Next`,
  prevLabel: t`Back`
})

export const stepsFactory = (
  steps: Step[],
  theme: PaletteMode
): Step[] => {
  return steps.map(i => ({ ...i, tooltipClass: theme }))
}
