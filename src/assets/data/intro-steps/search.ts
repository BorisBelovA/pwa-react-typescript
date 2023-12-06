import { type Step } from 'intro.js-react'

export const tooltips: Step[] = [
  {
    element: '[data-intro-id="nav-btn-search"]',
    title: 'Search',
    intro: 'Here you can browse the list of matches. Make sure you\'ve filled you profile page!'
  }
]

export const dynamicTooltips: Step[] = [
  {
    element: '[data-intro-id="search-dismiss-match"]',
    title: 'Dismiss',
    intro: 'Click here if you think there is no match with this person It will not appear in your list.'
  },
  {
    element: '[data-intro-id="search-like-match"]',
    title: 'Like',
    intro: 'Click here if you liked the person. A chat will appear in case of a match!'
  }
]
