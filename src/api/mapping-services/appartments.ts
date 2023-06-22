import type * as models from 'models'
import type * as dto from 'dto'

export const mapApartmentToDto = (apartment: models.Apartment): dto.Apartment => {
  return {
    id: apartment.id,
    name: apartment.name,
    price: apartment.totalPrice,
    countRooms: apartment.countRooms,
    availableRooms: apartment.countAvailableRooms,
    country: {
      id: apartment.location.country.id
    },
    city: {
      id: apartment.location.city?.id ?? null
    },
    state: {
      id: apartment.location.district?.id ?? null
    },
    photos: apartment.photos,
    aboutApartment: apartment.description
  }
}
