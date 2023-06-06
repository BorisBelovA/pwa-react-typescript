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
