import { type SessionService, sessionService } from './session'
import http from '../common-configuration'
import { type HttpResponse } from '../dto/common-interfaces'
import type * as dto from 'dto'

class Matching {
  private readonly sessionService!: SessionService

  constructor (sessionService: SessionService) {
    this.sessionService = sessionService
  }

  public async getMatches(page: number): Promise<dto.Match[]> {
    return await http.post<HttpResponse<dto.Match[]>>('/form/match', {
      pagination: {
        page
      }
    }, {
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

  public async likeUser (formIdTo: number): Promise<null> {
    return await http.post<HttpResponse<null>>('/match', { formIdTo }, {
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

export const matchingService = new Matching(sessionService)
