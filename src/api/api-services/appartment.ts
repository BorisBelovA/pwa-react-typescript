import { type SessionService, sessionService } from './session'
import http from '../common-configuration'
import { type HttpResponse } from '../dto/common-interfaces'
import type * as dto from 'dto'
import { type ApartmentFilters } from 'models'

class Apartment {
  private readonly sessionService!: SessionService

  constructor (sessionService: SessionService) {
    this.sessionService = sessionService
  }

  public async addNewApartment (apartment: dto.Apartment): Promise<dto.Apartment> {
    return await http.post<HttpResponse<dto.Apartment>>('/apartment', apartment, {
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

  public async updateApartment (apartment: dto.Apartment): Promise<dto.Apartment> {
    return await http.put<HttpResponse<dto.Apartment>>('/apartment', apartment, {
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

  public getApartmentById = async (id: string): Promise<dto.Apartment> => {
    return await http.get<HttpResponse<dto.Apartment>>(`/apartment/${id}`, {
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

  public async getApartmentByUser (): Promise<dto.Apartment[]> {
    return await http.get<HttpResponse<dto.Apartment[]>>('/apartment', {
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

  public async searchApartments (filters: ApartmentFilters): Promise<dto.Apartment[]> {
    return await http.post<HttpResponse<dto.Apartment[]>>(
      '/apartment/search',
      filters,
      {
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

export const apartmentService = new Apartment(sessionService)
