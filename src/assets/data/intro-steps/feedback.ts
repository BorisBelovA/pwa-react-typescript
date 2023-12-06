import { type Step } from 'intro.js-react'

export const tooltips: Step[] = [
  {
    element: '[data-intro-id="nav-btn-feedback"]',
    title: 'Feedback',
    intro: 'Here you can left some feedback for us. Feel free to describe ay issue or suggestion!'
  },
  {
    element: '[data-intro-id="feedback-input-field"]',
    title: 'Suggestions | Claims',
    intro: 'Type here any suggestions or describe an issue you have faced. We will do our best to resolve it.'
  },
  {
    element: '[data-intro-id="feedback-donate-btn"]',
    title: 'Donate',
    intro: 'Here you can donate some money to our team for coffee and cookies👻'
  },
  {
    element: '[data-intro-id="non-existing"]',
    title: 'Congratulations',
    intro: 'That was a brief overview of our application! Now it\'s time for you to explore it further!'
  }
]
