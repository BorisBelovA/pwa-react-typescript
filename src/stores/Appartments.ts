import { type City, type Apartment, type District } from 'models'
import { type RootStore } from './RootStore'
import { apartmentService } from 'src/api/api-services/appartment'
import { action, computed, makeAutoObservable, observable } from 'mobx'
import { locationService } from 'src/api/api-services/location'
import { mapPhotoNameToURI } from 'mapping-services'
export class ApartmentsStore {
  public apartments: Apartment[] = []

  private readonly rootStore!: RootStore

  constructor (rootStore: RootStore) {
    makeAutoObservable(this, {
      apartments: observable,
      setApartments: action,
      getApartment: action,
      haveApartment: computed
    })
    this.rootStore = rootStore
  }

  public setApartments (apartments: Apartment[]): void {
    this.apartments = apartments
  }

  get haveApartment (): boolean {
    return this.apartments.length > 0
  }

  public getApartment = async (): Promise<void> => {
    try {
      const apartmentDto = await apartmentService.getApartmentByUser()
      if (apartmentDto !== null) {
        const apartments = await Promise.all(apartmentDto.map(async dto => {
          const apartment: Apartment = {
            id: dto.id,
            name: dto.name,
            totalPrice: dto.price,
            countRooms: dto.countRooms,
            currency: 'ILS',
            countAvailableRooms: dto.availableRooms,
            location: {
              city: { id: 0, name: '' },
              country: { id: 0, name: '', emoji: '' },
              district: { id: 0, name: '' }
            },
            photos: dto.photos.map(p => mapPhotoNameToURI(p)),
            description: dto.aboutApartment ?? ''
          }
          try {
            const country = await locationService.getCountryById(dto.country.id)
            let city: City | undefined
            let district: District | undefined
            if (dto.state?.id) {
              district = await locationService.getDistrictsById(dto.state.id)
            }
            if (dto.city?.id) {
              city = await locationService.getCityById(dto.city.id)
            }
            apartment.location = { country, district, city }
            return apartment
          } catch (e) {
            console.error(e)
            throw new Error('Something went wrong')
          }
        }))
        this.setApartments(apartments)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
