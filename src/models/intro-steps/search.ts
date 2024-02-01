import { t } from '@lingui/macro'
import { type WalkthroughStep } from 'models/steps'

export const tooltips = (): WalkthroughStep[] => [
  {
    title: t`Search`,
    intro: t`Here you can browse the list of matches. Make sure you've filled you profile page!`
  }
]

export const dynamicTooltips = (): WalkthroughStep[] => [
  {
    element: '[data-intro-id="search-dismiss-match"]',
    title: t`Dismiss`,
    intro: t`Click here if you think there is no match with this person It will not appear in your list.`
  },
  {
    element: '[data-intro-id="search-like-match"]',
    title: t`Like`,
    intro: t`Click here if you liked the person. A chat will appear in case of a match!`
  }
]
