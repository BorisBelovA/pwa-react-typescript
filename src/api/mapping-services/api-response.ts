import { type AuthUser, type QuestionnaireBasicType } from 'models'
import { type AuthenticatedUserData } from '../dto/api-responses'
import { mapUserToModel } from './user'
import { mapQuestionnaireToModel } from './questionnaire'

export const mapAuthenticatedUserData = (response: AuthenticatedUserData): [AuthUser, QuestionnaireBasicType | null] => {
  const { avatar, birthday, firstName, gender, id, lastName, phone, photo } = response
  const user = mapUserToModel({
    avatar, birthday, firstName, gender, id, lastName, phone, photo
  })

  if (response.form) {
    const basicQuest = mapQuestionnaireToModel(response.form)
    return [user, basicQuest]
  }
  return [user, null]
}
