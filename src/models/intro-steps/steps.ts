import { t } from '@lingui/macro'
import { type PaletteMode } from '@mui/material'
import { type WalkthroughStep } from '../steps'

export const defaultStepsOptions = () => ({
  hidePrev: true,
  buttonClass: 'intro-buttons',
  disableInteraction: true,
  showBullets: false,
  nextLabel: t`Next`,
  prevLabel: t`Back`
})

export const stepsFactory = (
  steps: WalkthroughStep[],
  theme: PaletteMode
): WalkthroughStep[] => {
  return steps.map((el, idx) => ({
    ...el,
    isLastStep: idx === steps.length - 1,
    tooltipClass: theme
  }))
}
