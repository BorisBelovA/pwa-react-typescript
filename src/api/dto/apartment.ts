export interface Apartment {
  id: number
  name: string
  price: number
  countRooms: number
  availableRooms: number
  country: {
    id: number
  }
  city: {
    id : number | null
  }
  state: {
    id: number | null
  }
  photos: string[]
  aboutApartment: string | null
}
