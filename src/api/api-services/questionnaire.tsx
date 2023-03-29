import { type SessionService, sessionService } from './session'
import http from '../common-configuration'

class Questionnaire {
  constructor(sessionService: SessionService) {
    console.log(sessionService.authToken)
  }
}

export const q = new Questionnaire(sessionService)
