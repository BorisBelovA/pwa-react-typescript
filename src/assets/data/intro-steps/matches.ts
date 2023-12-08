import { t } from '@lingui/macro'
import { type Step } from 'intro.js-react'

export const tooltips = (): Step[] => [
  {
    element: '[data-intro-id="nav-btn-match"]',
    title: t`Matches`,
    intro: t`Here you can see the list of dialogs with your partners`
  },
  {
    element: '[data-intro-id="matches-chat-room"]',
    title: t`Chat`,
    intro: t`Looks like this person likes you too!🤗 When you have match you can start a conversation.`
  }
]
