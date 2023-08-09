import http from '../common-configuration'
import { type HttpResponse } from '../dto/common-interfaces'
import { type City, type District, type Country } from '../dto/location'
import { type SessionService, sessionService } from './session'

class LocationService {
  private readonly sessionService!: SessionService

  constructor (sessionService: SessionService) {
    this.sessionService = sessionService
  }

  public async getCountries (): Promise<Country[]> {
    const country = await this.getCountryById(106)
    return [country]
    // До лучших времен пока не откроем показ всех стран
    // return await http.get<HttpResponse<Country[]>>('/geo/countries', {
    //   headers: {
    //     Authorization: this.sessionService.authToken
    //   }
    // })
    //   .then(response => {
    //     if (response.data.status.severityCode === 'ERROR') {
    //       throw new Error(response.data.status.statusCodeDescription)
    //     }
    //     return response.data.response
    //   })
    //   .catch(errorResponse => {
    //     console.error(errorResponse.response?.data?.message ?? errorResponse.message)
    //     throw new Error(errorResponse.response?.data?.message ?? errorResponse.message)
    //   })
  }

  public async getCountryById (id: number): Promise<Country> {
    return await http.get<HttpResponse<Country>>(`/geo/country/${id}`, {
      headers: {
        Authorization: this.sessionService.authToken
      }
    })
      .then(response => {
        if (response.data.status.severityCode === 'ERROR') {
          throw new Error(response.data.status.statusCodeDescription)
        }
        return response.data.response
      })
      .catch(errorResponse => {
        console.error(errorResponse.response?.data?.message ?? errorResponse.message)
        throw new Error(errorResponse.response?.data?.message ?? errorResponse.message)
      })
  }

  public async getDistrictsByCountry (countryId: number): Promise<District[]> {
    return await http.get<HttpResponse<District[]>>(`/geo/states/${countryId}`, {
      headers: {
        Authorization: this.sessionService.authToken
      }
    })
      .then(response => {
        if (response.data.status.severityCode === 'ERROR') {
          throw new Error(response.data.status.statusCodeDescription)
        }
        return response.data.response
      })
      .catch(errorResponse => {
        console.error(errorResponse.response?.data?.message ?? errorResponse.message)
        throw new Error(errorResponse.response?.data?.message ?? errorResponse.message)
      })
  }

  public async getDistrictsById (districtId: number): Promise<District> {
    return await http.get<HttpResponse<District>>(`/geo/state/${districtId}`, {
      headers: {
        Authorization: this.sessionService.authToken
      }
    })
      .then(response => {
        if (response.data.status.severityCode === 'ERROR') {
          throw new Error(response.data.status.statusCodeDescription)
        }
        return response.data.response
      })
      .catch(errorResponse => {
        console.error(errorResponse.response?.data?.message ?? errorResponse.message)
        throw new Error(errorResponse.response?.data?.message ?? errorResponse.message)
      })
  }

  public async getCitiesByDistrictId (districtId: number): Promise<City[]> {
    return await http.get<HttpResponse<City[]>>(`/geo/cities/${districtId}`, {
      headers: {
        Authorization: this.sessionService.authToken
      }
    })
      .then(response => {
        if (response.data.status.severityCode === 'ERROR') {
          throw new Error(response.data.status.statusCodeDescription)
        }
        return response.data.response
      })
      .catch(errorResponse => {
        console.error(errorResponse.response?.data?.message ?? errorResponse.message)
        throw new Error(errorResponse.response?.data?.message ?? errorResponse.message)
      })
  }

  public async getCityById (cityId: number): Promise<City> {
    return await http.get<HttpResponse<City>>(`/geo/city/${cityId}`, {
      headers: {
        Authorization: this.sessionService.authToken
      }
    })
      .then(response => {
        if (response.data.status.severityCode === 'ERROR') {
          throw new Error(response.data.status.statusCodeDescription)
        }
        return response.data.response
      })
      .catch(errorResponse => {
        console.error(errorResponse.response?.data?.message ?? errorResponse.message)
        throw new Error(errorResponse.response?.data?.message ?? errorResponse.message)
      })
  }
}

export const locationService = new LocationService(sessionService)
