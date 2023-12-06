import { type Step } from 'intro.js-react'

const tooltips: Step[] = [
  {
    element: '[data-intro-id="nav-btn-profile"]',
    title: 'Profile',
    intro: 'On this page you can view your profile, visit your apartments or change system settings'
  },
  {
    element: '[data-intro-id="profile-my-profile-view"]',
    title: 'Profile preview',
    intro: 'Click here to view your profile to understand how you will appear in search'
  },
  {
    element: '[data-intro-id="profile-about-me"]',
    title: 'About me',
    intro: 'In this section you can fill basic information about yourself and complete our questionnaire'
  },
  {
    element: '[data-intro-id="profile-my-apartments"]',
    title: 'My Apartments',
    intro: 'Here you can view all your apartments and new'
  },
  {
    element: '[data-intro-id="profile-settings"]',
    title: 'Settings',
    intro: 'Here you can change application settings and appearance'
  },
  {
    element: '[data-intro-id="profile-donate"]',
    title: 'Donate',
    intro: 'Here you can donate some money to our team for coffee and cookies👻'
  }
]

export default tooltips
