export interface Apartment {
  id: number
  name: string
  price: number
  countRooms: number
  availableRooms: number
  country: string
  city: string
  district: string
  photos: string[]
  aboutApartment: string | null
}
