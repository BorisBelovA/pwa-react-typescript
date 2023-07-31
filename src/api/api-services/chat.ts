import { type SessionService, sessionService } from './session'
import http from '../common-configuration'
import { type HttpResponse } from '../dto/common-interfaces'
import type * as dto from 'dto'

class Chat {
  private readonly sessionService!: SessionService

  constructor (sessionService: SessionService) {
    this.sessionService = sessionService
  }

  public async getAllChats (): Promise<dto.Chat[]> {
    return await http.get<HttpResponse<dto.Chat[]>>('/chatRoom', {
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

  public async getMessagesInChat (chatId: number): Promise<dto.Message[]> {
    return await http.get<HttpResponse<dto.Message[]>>(`/chatMessage/${chatId}`, {
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

export const chatService = new Chat(sessionService)
