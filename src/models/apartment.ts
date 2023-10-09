import { type City, type Country, type District } from './location'

export type Currency = 'USD' | 'EUR' | 'ILS'

export type ApartmentPurpose = 'Rent' | 'Questionnaire' | 'Other'

export interface Apartment {
  id: number
  name: string
  totalPrice: number
  currency: Currency
  countRooms: number
  countAvailableRooms: number
  location: {
    country: Country
    district: District | null
    city: City | null
    address: string | null
  }
  photos: string[]
  description: string
  purpose: ApartmentPurpose
  formId: number | null
}

export interface NewApartmentForm {
  id: number | null
  name: string | null
  totalPrice: number | null
  currency: Currency | null
  countRooms: number | null
  countAvailableRooms: number | null
  location: {
    country?: Country | null
    district?: District | null
    city?: City | null
    address?: string | null
  }
  photos: string[]
  description: string | null
  purpose: ApartmentPurpose | null
  formId: number | null
}

export interface ApartmentFilters {
  country: {
    id: number
  }
  city?: {
    id: number
  }
  state?: {
    id: number
  }
  sort: {
    field: string
    direction: string
  }
  priceFrom: number
  priceTo: number
  currency: string

  pagination: {
    page: number
    size: number
  }
}
