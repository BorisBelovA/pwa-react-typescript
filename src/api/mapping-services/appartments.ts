import type * as models from 'models'
import { type Apartment, ApartmentPurpose, Currency } from '../dto/apartment'
import { extractFileName, mapPhotoNameToURI } from './file-mapping'

export const mapPurposeToModel = (purpose: ApartmentPurpose): models.ApartmentPurpose => {
  switch (purpose) {
    case ApartmentPurpose.Rent:
      return 'Rent'
    case ApartmentPurpose.Other:
      return 'Other'
    case ApartmentPurpose.Questionnaire:
      return 'Questionnaire'
    default: throw new Error('Unknown purpose')
  }
}

export const mapPurposeToDto = (purpose: models.ApartmentPurpose): ApartmentPurpose => {
  switch (purpose) {
    case 'Rent':
      return ApartmentPurpose.Rent
    case 'Questionnaire':
      return ApartmentPurpose.Questionnaire
    case 'Other':
      return ApartmentPurpose.Other
    default: throw new Error('Unknown purpose')
  }
}

export const mapCurrencyToDto = (currency: models.Currency): Currency => {
  switch (currency) {
    case 'USD': return Currency.USD
    case 'EUR': return Currency.EUR
    case 'ILS': return Currency.ILS
    default: {
      throw new Error('Unknown type of currency!')
    }
  }
}

export const mapCurrencyToModel = (currency: Currency): models.Currency => {
  switch (currency) {
    case Currency.USD: return 'USD'
    case Currency.EUR: return 'EUR'
    case Currency.ILS: return 'ILS'
    default: {
      throw new Error('Unknown type of currency!')
    }
  }
}

export const mapApartmentToDto = (apartment: models.Apartment): Apartment => {
  return {
    id: apartment.id,
    name: apartment.name,
    price: +apartment.totalPrice,
    currency: mapCurrencyToDto(apartment.currency),
    countRooms: apartment.countRooms,
    availableRooms: apartment.countAvailableRooms,
    country: apartment.location.country,
    city: apartment.location.city,
    state: apartment.location.district,
    photos: apartment.photos.map(p => extractFileName(p)),
    aboutApartment: apartment.description,
    status: mapPurposeToDto(apartment.purpose),
    formId: apartment.formId
  }
}

export const mapApartmentToModel = (apartment: Apartment): models.Apartment => {
  return {
    id: apartment.id,
    name: apartment.name,
    totalPrice: apartment.price,
    countRooms: apartment.countRooms,
    currency: mapCurrencyToModel(apartment.currency),
    countAvailableRooms: apartment.availableRooms,
    location: {
      country: apartment.country,
      city: apartment.city,
      district: apartment.state
    },
    photos: apartment.photos.map(p => mapPhotoNameToURI(p)),
    description: apartment.aboutApartment ?? '',
    purpose: mapPurposeToModel(apartment.status),
    formId: apartment.formId
  }
}
