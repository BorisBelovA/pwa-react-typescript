import { type SessionService, sessionService } from './session'
import http from '../common-configuration'
import { type HttpResponse } from '../dto/common-interfaces'

class Feedback {
  private readonly sessionService!: SessionService

  constructor (sessionService: SessionService) {
    this.sessionService = sessionService
  }

  public async sendFeedback (senderEmail: string, message: string): Promise<null> {
    return await http.post<HttpResponse<null>>('/bot/suggestion', {
      senderEmail, message
    }, {
      headers: {
        Authorization: this.sessionService.authToken
      }
    })
      .then(response => {
        if (response?.data?.status?.severityCode === 'ERROR') {
          throw new Error(response.data.status.statusCodeDescription)
        }
        return null
      })
      .catch(errorResponse => {
        console.error(errorResponse.response?.data?.message ?? errorResponse.message)
        if (errorResponse instanceof Error) {
          throw errorResponse
        } else {
          throw new Error(errorResponse.message ?? 'Unexpected behavior')
        }
      })
  }

  public async sendComplain (
    pretensionEmail: string,
    senderEmail: string,
    message: string
  ): Promise<null> {
    return await http.post<HttpResponse<null>>('/bot/claim', {
      pretensionEmail, senderEmail, message
    }, {
      headers: {
        Authorization: this.sessionService.authToken
      }
    })
      .then(response => {
        if (response?.data?.status?.severityCode === 'ERROR') {
          throw new Error(response.data.status.statusCodeDescription)
        }
        return null
      })
      .catch(errorResponse => {
        console.error(errorResponse.response?.data?.message ?? errorResponse.message)
        if (errorResponse instanceof Error) {
          throw errorResponse
        } else {
          throw new Error(errorResponse.message ?? 'Unexpected behavior')
        }
      })
  }
}

export const feedbackService = new Feedback(sessionService)
