import { t } from '@lingui/macro'
import { type WalkthroughStep } from '../steps'

const tooltips = (): WalkthroughStep[] => [
  {
    element: '[data-intro-id="nav-btn-profile"]',
    title: t`Profile`,
    intro: t`On this page you can view your profile, visit your apartments or change system settings`
  },
  {
    element: '[data-intro-id="profile-my-profile-view"]',
    title: t`Profile preview`,
    intro: t`Click here to view your profile to understand how you will appear in search`
  },
  {
    element: '[data-intro-id="profile-about-me"]',
    title: t`About me`,
    intro: t`In this section you can fill basic information about yourself and complete our questionnaire`
  },
  {
    element: '[data-intro-id="profile-my-apartments"]',
    title: t`My Apartments`,
    intro: t`Here you can view all your apartments and add new`
  },
  {
    element: '[data-intro-id="profile-settings"]',
    title: t`Settings`,
    intro: t`Here you can change application settings and appearance`
  },
  {
    element: '[data-intro-id="profile-donate"]',
    title: t`Donate`,
    intro: t`Here you can donate some money to our team for coffee and cookies👻`,
    isLastStep: true
  }
]

export default tooltips
