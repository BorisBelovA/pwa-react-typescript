export type Currency = 'USD' | 'EUR' | 'ILS'

export interface Appartment {
  id: number
  name: string
  totalPrice: number
  curency: Currency
  countRooms: number
  countAvailableRooms: number
  location: {
    country: string
    city: string
    district: string
  }
  photos: string[]
  description: string
}

export const enum AppartmentsRoutes {
  BASIC = 'basic',
  LOCATION = 'location',
  PHOTOS = 'photos',
  ABOUT = 'about',
  SUMMARY = 'summary'
}
