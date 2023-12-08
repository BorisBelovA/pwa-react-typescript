import { t } from '@lingui/macro'
import { type Step } from 'intro.js-react'

export const tooltips = (): Step[] => [
  {
    element: '[data-intro-id="nav-btn-apartment-search"]',
    title: t`Apartments Search`,
    intro: t`Here you can find whatever apartment you like`
  },
  {
    element: '[data-intro-id="apartment-search-filters"]',
    title: t`Filters`,
    intro: t`You can use filters to refine your search`
  },
  {
    element: '[data-intro-id="apartment-search-try-again"]',
    title: t`More apartments`,
    intro: t`Click here to load more apartments`
  }
]

export const dynamicTooltips = (): Step[] => [
  {
    element: '[data-intro-id="apartment-search-apartment-thumbnail"]',
    title: t`Apartment`,
    intro: t`This tile represents an available apartment. You can see the price, amount of available rooms and it\'s location`
  },
  {
    element: '[data-intro-id="apartment-for-refugees-flag"]',
    title: t`Apartments for refugees`,
    intro: t`This means that the owner of the apartment is ready to accommodate refugees for free`
  }
]
