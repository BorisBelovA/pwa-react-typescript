import { action, makeAutoObservable, observable } from 'mobx'
import { type RootStore } from './RootStore'
import { type Apartment } from 'models'
import { apartmentService } from 'src/api/api-services/appartment'
import { mapApartmentToModel } from 'mapping-services'

export class ApartmnetSearchStore {
  apartments: Apartment[] = []
  haveMore: boolean = true
  rootStore: RootStore

  constructor (rootStore: RootStore) {
    makeAutoObservable(this, {
      rootStore: false,
      resetApartments: action,
      getApartments: action,
      getMoreApartments: action,
      setApartments: action,
      setHaveMore: action,
      apartments: observable,
      haveMore: observable
    })
    this.rootStore = rootStore
  }

  public setApartments = (apartments: Apartment[]): void => {
    this.apartments = apartments
  }

  public setHaveMore = (haveMore: boolean): void => {
    this.haveMore = haveMore
  }

  public resetApartments = (): void => {
    this.setApartments([])
  }

  public getApartments = async (): Promise<void> => {
    try {
      const response = await apartmentService.searchApartments(this.rootStore.apartmentFiltersStore.getFilters())
      this.setApartments(response.map((apt) => mapApartmentToModel(apt)))
    } catch (error) {
      console.log(error)
    }
  }

  public getMoreApartments = async (): Promise<void> => {
    try {
      const response = await apartmentService.searchApartments({
        ...this.rootStore.apartmentFiltersStore.getFilters(),
        pagination: {
          ...this.rootStore.apartmentFiltersStore.getFilters().pagination,
          page: this.rootStore.apartmentFiltersStore.pagination.page + 1
        }
      })
      if (response.length > 0) {
        this.setApartments([...this.apartments, ...response.map((apt) => mapApartmentToModel(apt))])
        this.setHaveMore(true)
        this.rootStore.apartmentFiltersStore.setPage(this.rootStore.apartmentFiltersStore.pagination.page + 1)
      } else {
        this.setHaveMore(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
