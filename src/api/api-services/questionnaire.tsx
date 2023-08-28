import { type SessionService, sessionService } from './session'
import http from '../common-configuration'
import { type QuestionnaireBasicType } from 'models'
import { mapQuestionnaireToDto } from '../mapping-services/questionnaire'
import { type HttpResponse } from '../dto/common-interfaces'
import { type Questionnaire as dtoQuestionnaire } from '../dto/questionnaire'

class Questionnaire {
  private readonly sessnioService!: SessionService

  constructor (sessionService: SessionService) {
    this.sessnioService = sessionService
  }

  public async createQuestForm (questionnaire: QuestionnaireBasicType): Promise<dtoQuestionnaire> {
    const dto = {
      ...mapQuestionnaireToDto(questionnaire),
      id: null
    }
    return await http.post<HttpResponse<dtoQuestionnaire>>('/form', dto, {
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

  public async updateQuestForm (questionnaire: QuestionnaireBasicType): Promise<dtoQuestionnaire> {
    const dto = mapQuestionnaireToDto(questionnaire)
    return await http.put<HttpResponse<dtoQuestionnaire>>('/form', dto, {
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

  public async getAuthorizedUserQuestionnaire (): Promise<dtoQuestionnaire | null> {
    return await http.get<HttpResponse<dtoQuestionnaire | null>>('/form/active', {
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

  public async getQuestionnaireByUserId (userId: number): Promise<dtoQuestionnaire | null> {
    return await http.get<HttpResponse<dtoQuestionnaire | null>>(`/form/active/user/${userId}`, {
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
        if (errorResponse instanceof Error) {
          throw errorResponse
        } else {
          throw new Error(errorResponse.message ?? 'Unexpected behavior')
        }
      })
  }
}

export const questionnaireService = new Questionnaire(sessionService)
