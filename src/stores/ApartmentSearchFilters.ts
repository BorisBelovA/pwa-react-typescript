import { type ApartmentFilters } from 'models'
import { type RootStore } from './RootStore'
import { makeAutoObservable } from 'mobx'

export class ApartmentFiltersStore implements ApartmentFilters {
  country: { id: number } | undefined = {
    id: 106
  }

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

  public setPage = (page: number): void => {
    this.pagination.page = page
  }

  public reset = (): void => {
    this.city = undefined
    this.state = undefined
    this.priceFrom = 0
    this.priceTo = 20000
  }

  public setCountry = (id: number | undefined): void => {
    if (id) {
      this.country = { id }
    } else {
      this.country = undefined
    }
  }

  public setState = (id: number | undefined): void => {
    if (id) {
      this.state = { id }
    } else {
      this.state = undefined
    }
  }

  public setCity = (id: number | undefined): void => {
    if (id) {
      this.city = { id }
    } else {
      this.city = undefined
    }
  }

  public setPrice = (from: number | undefined, to: number | undefined): void => {
    this.priceFrom = from
    this.priceTo = to
  }
}
