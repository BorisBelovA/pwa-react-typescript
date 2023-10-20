import { type ApartmentFilters } from 'models'
import { type RootStore } from './RootStore'
import { makeAutoObservable } from 'mobx'

export class ApartmentFiltersStore implements ApartmentFilters {
  country: { id: number } | undefined = undefined

  city?: { id: number } | undefined

  state?: { id: number } | undefined

  sort = {
    field: 'price',
    direction: 'DESC'
  }

  priceFrom: number | undefined = 0

  priceTo: number | undefined = 20000

  currency = 'NIS'

  pagination = {
    page: 0,
    size: 5
  }

  rootStore: RootStore

  constructor (rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
  }

  public getFilters = (): ApartmentFilters => {
    return {
      country: this.country,
      city: this.city,
      state: this.state,
      priceFrom: this.priceFrom,
      priceTo: this.priceTo,
      currency: this.currency,
      pagination: this.pagination,
      sort: this.sort
    }
  }

  public updateStorage = (): void => {
    this.writeToLocalStorage({
      country: this.country,
      city: this.city,
      state: this.state,
      sort: this.sort,
      priceFrom: this.priceFrom,
      priceTo: this.priceTo,
      currency: this.currency,
      pagination: { ...this.pagination, page: 0 }
    })
  }

  public getFromLocalStorage = (): void => {
    const data = localStorage.getItem('apartment_filters')
    if (data !== null) {
      const filters = JSON.parse(data) as ApartmentFilters
      this.setCountry(filters.country?.id)
      this.setState(filters.state?.id)
      this.setCity(filters.city?.id)
      this.setPrice(filters.priceFrom, filters.priceTo)
    }
  }

  public writeToLocalStorage = (filters: ApartmentFilters): void => {
    localStorage.setItem('apartment_filters', JSON.stringify(filters))
  }

  public setPage = (page: number): void => {
    this.pagination.page = page
  }

  public reset = (): void => {
    this.city = undefined
    this.state = undefined
    this.priceFrom = 0
    this.priceTo = 20000
    this.updateStorage()
  }

  public setCountry = (id: number | undefined): void => {
    if (id) {
      this.country = { id }
    } else {
      this.country = undefined
    }
    this.updateStorage()
  }

  public setState = (id: number | undefined): void => {
    if (id) {
      this.state = { id }
    } else {
      this.state = undefined
    }
    this.updateStorage()
  }

  public setCity = (id: number | undefined): void => {
    if (id) {
      this.city = { id }
    } else {
      this.city = undefined
    }
    this.updateStorage()
  }

  public setPrice = (from: number | undefined, to: number | undefined): void => {
    this.priceFrom = from
    this.priceTo = to
    this.updateStorage()
  }
}
