import { type SessionService, sessionService } from './session'
import http from '../common-configuration'
import { type HttpResponse } from '../dto/common-interfaces'
import type * as dto from 'dto'

class Matching {
  private readonly sessionService!: SessionService

  constructor(sessionService: SessionService) {
    this.sessionService = sessionService
  }

  public async getMatches(page: number): Promise<dto.Match[]> {
    return await http.get<HttpResponse<dto.Match[]>>(`/form/match/page/${page}`, {
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

  public async likeUser (formId: number): Promise<null> {
    return await http.post<HttpResponse<null>>('/api/v1/match', { formId }, {
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
