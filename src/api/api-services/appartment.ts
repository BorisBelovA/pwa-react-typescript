import { type SessionService, sessionService } from './session'
import http from '../common-configuration'
import { type HttpResponse } from '../dto/common-interfaces'
import { type ApartmentFilters } from 'models'
import { ApartmentPurpose, type Apartment as DtoApartment } from '../dto/apartment'
class Apartment {
  private readonly sessionService!: SessionService

  constructor (sessionService: SessionService) {
    this.sessionService = sessionService
  }

  public async addNewApartment (apartment: DtoApartment): Promise<DtoApartment> {
    return await http.post<HttpResponse<DtoApartment>>('/apartment', apartment, {
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

  public async updateApartment (apartment: DtoApartment): Promise<DtoApartment> {
    return await http.put<HttpResponse<DtoApartment>>('/apartment', apartment, {
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

  public getApartmentById = async (id: string): Promise<DtoApartment> => {
    return await http.get<HttpResponse<DtoApartment>>(`/apartment/${id}`, {
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

  public async getApartmentByUser (): Promise<DtoApartment[]> {
    return await http.get<HttpResponse<DtoApartment[]>>('/apartment', {
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

  public async searchApartments (filters: ApartmentFilters): Promise<DtoApartment[]> {
    return await http.post<HttpResponse<DtoApartment[]>>(
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

  public async removeAd (apartment: DtoApartment): Promise<DtoApartment> {
    return await this.updateApartment({
      ...apartment,
      status: ApartmentPurpose.Other
    })
  }
}

export const apartmentService = new Apartment(sessionService)
