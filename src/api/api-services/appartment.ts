import { type SessionService, sessionService } from './session'
import http from '../common-configuration'
import { type HttpResponse } from '../dto/common-interfaces'
import * as dto from 'dto'

class Appartment {
  private readonly sessnioService!: SessionService

  constructor(sessionService: SessionService) {
    this.sessnioService = sessionService
  }

  public async addNewAppartment(appartment: dto.Appartment): Promise<dto.Appartment> {
    return await http.post<HttpResponse<dto.Appartment>>('/apartment', appartment, {
      headers: {
        Authorization: this.sessnioService.authToken
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

  public async updateAppartment (appartment: dto.Appartment): Promise<dto.Appartment> {
    return await http.put<HttpResponse<dto.Appartment>>('/apartment', appartment, {
      headers: {
        Authorization: this.sessnioService.authToken
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

  public async getAppartmentByUser (): Promise<dto.Appartment | null> {
    return await http.get<HttpResponse<dto.Appartment | null>>('/apartment', {
      headers: {
        Authorization: this.sessnioService.authToken
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

export const appartmentService = new Appartment(sessionService)
