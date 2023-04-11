import { type SessionService, sessionService } from './session'
import http from '../common-configuration'
import { type QuestionnaireBasicType } from 'models'
import { mapQuestionnaireToDto } from '../mapping-services/questionnaire'
import { type HttpResponse } from '../dto/common-interfaces'
import { type CreateQuestFormResponse } from '../dto/questionnaire'

class Questionnaire {
  private readonly sessnioService!: SessionService

  constructor (sessionService: SessionService) {
    this.sessnioService = sessionService
  }

  public async createQuestForm (questionnaire: QuestionnaireBasicType): Promise<CreateQuestFormResponse> {
    console.log(this.sessnioService.authToken)
    const dto = mapQuestionnaireToDto(questionnaire)
    return await http.post<HttpResponse<CreateQuestFormResponse>>('/form/1', dto, {headers: {
      Authorization: this.sessnioService.authToken
    }})
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

export const q = new Questionnaire(sessionService)
