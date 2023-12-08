import { t } from '@lingui/macro'
import { type Step } from 'intro.js-react'

export const tooltips = (): Step[] => [
  {
    element: '[data-intro-id="nav-btn-feedback"]',
    title: t`Feedback`,
    intro: t`Here you can left some feedback for us. Feel free to describe ay issue or suggestion!`
  },
  {
    element: '[data-intro-id="feedback-input-field"]',
    title: t`Suggestions | Claims`,
    intro: t`Type here any suggestions or describe an issue you have faced. We will do our best to resolve it.`
  },
  {
    element: '[data-intro-id="feedback-donate-btn"]',
    title: t`Donate`,
    intro: t`Here you can donate some money to our team for coffee and cookies👻`
  },
  {
    element: '[data-intro-id="non-existing"]',
    title: t`Congratulations`,
    intro: t`That was a brief overview of our application! Now it\'s time for you to explore it further!`
  }
]
