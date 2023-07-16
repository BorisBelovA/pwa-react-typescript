import { City, Country, District } from "./location"

export const enum ApartmentPurpose {
  Rent = 'LINK_TO_USER',
  Questionnaire = 'LINK_TO_FORM',
  Other = 'UNLINKED'
}

export const enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  ILS = 'NIS'
}
export interface Apartment {
  id: number
  name: string
  price: number
  countRooms: number
  currency: Currency
  availableRooms: number
  country: Country
  city: City | null
  state: District | null
  photos: string[]
  aboutApartment: string | null
  status: ApartmentPurpose
  formId: number | null
}
