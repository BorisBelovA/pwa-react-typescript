import { type ApartmentFilters } from 'models'
import { type RootStore } from './RootStore'
import { makeAutoObservable } from 'mobx'

export class ApartmentFiltersStore implements ApartmentFilters {
  country = {
    id: 106
  }

  city?: { id: number } | undefined

  state?: { id: number } | undefined

  sort = {
    field: 'price',
    direction: 'DESC'
  }

  priceFrom = 0

  priceTo = 20000

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
}
