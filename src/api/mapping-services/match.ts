import * as dto from 'dto'
import * as models from 'models'
import { mapQuestionnaireToDto, mapQuestionnaireToModel } from './questionnaire'
import { mapUserToDto, mapUserToModel } from './user'

export const mapMatchToModel = (match: dto.Match): models.MatchNew => {
  return {
    form: mapQuestionnaireToModel(match.form),
    user: mapUserToModel(match.user)
  }
}

export const mapMatchToDto = (match: models.MatchNew): dto.Match => {
  return {
    form: mapQuestionnaireToDto(match.form),
    user: mapUserToDto(match.user)
  }
}
