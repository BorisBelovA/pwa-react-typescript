import * as models from 'models'
import * as dto from 'dto'

export const mapAppartmentToDto = (appartment: models.Appartment): dto.Appartment => {
  return {
    id: appartment.id,
    name: appartment.name,
    price: appartment.totalPrice,
    countRooms: appartment.countRooms,
    availableRooms: appartment.countAvailableRooms,
    country: appartment.location.country,
    city: appartment.location.city,
    district: appartment.location.district,
    photos: appartment.photos,
    aboutApartment: appartment.description
  }
}

export const mapAppartmentToModel = (appartment: dto.Appartment): models.Appartment => {
  return {
    id: appartment.id,
    name: appartment.name,
    totalPrice: appartment.price,
    countRooms: appartment.countRooms,
    curency: 'ILS',
    countAvailableRooms: appartment.availableRooms,
    location: {
      city: appartment.city,
      country: appartment.country,
      district: appartment.district
    },
    photos: appartment.photos,
    description: appartment.aboutApartment ?? ''
  }
}
