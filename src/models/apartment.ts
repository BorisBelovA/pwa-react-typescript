import { type City, type Country, type District } from './location'

export type Currency = 'USD' | 'EUR' | 'ILS'

export interface Apartment {
  id: number
  name: string
  totalPrice: number
  currency: Currency
  countRooms: number
  countAvailableRooms: number
  location: {
    country: Country
    district?: District
    city?: City
    address?: string
  }
  photos: string[]
  description: string
}

export interface NewApartmentForm {
  id: number
  name: string | null
  totalPrice: number | null
  currency: Currency | null
  countRooms: number | null
  countAvailableRooms: number | null
  location: {
    country?: Country
    district?: District
    city?: City
    address?: string
  }
  photos: string[]
  description: string | null
}
