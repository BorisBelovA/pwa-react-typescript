import { action, makeAutoObservable, observable } from 'mobx'
import { type RootStore } from './RootStore'
import { type Apartment } from 'models'
import { apartmentService } from 'src/api/api-services/appartment'
import { mapApartmentToModel } from 'mapping-services'

export class ApartmnetSearchStore {
  apartments: Apartment[] = []
  haveMore: boolean = true
  rootStore: RootStore
  scroll: number = 0

  constructor (rootStore: RootStore) {
    makeAutoObservable(this, {
      rootStore: false,
      resetApartments: action,
      getApartments: action,
      getMoreApartments: action,
      setScroll: action,
      setApartments: action,
      setHaveMore: action,
      apartments: observable,
      haveMore: observable
    })
    this.rootStore = rootStore
  }

  public setScroll = (scroll: number): void => {
    this.scroll = scroll
  }

  public setApartments = (apartments: Apartment[]): void => {
    this.apartments = apartments
  }

  public setHaveMore = (haveMore: boolean): void => {
    this.haveMore = haveMore
  }

  public resetApartments = (): void => {
    this.setApartments([])
    this.setHaveMore(true)
    this.setScroll(0)
  }

  public getApartments = async (): Promise<void> => {
    try {
      const response = await apartmentService.searchApartments(this.rootStore.apartmentFiltersStore.getFilters())
      this.setApartments(response.map((apt) => mapApartmentToModel(apt)))
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Something went wrong'
      )
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
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Something went wrong'
      )
    }
  }
}
