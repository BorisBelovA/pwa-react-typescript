import { type AuthUser, type QuestionnaireBasicType, type UserForm } from 'models'
import { type AuthenticatedUserData } from '../dto/api-responses'
import { mapUserToModel } from './user'
import { mapQuestionnaireToModel } from './questionnaire'

export const mapAuthenticatedUserData = (response: AuthenticatedUserData): [AuthUser, QuestionnaireBasicType | null] => {
  const { avatar, birthday, email, firstName, gender, id, lastName, password, phone, photo } = response
  const user = mapUserToModel({
    avatar, birthday, email, firstName, gender, id, lastName, password, phone, photo
  })

  if (response.form) {
    const basicQuest = mapQuestionnaireToModel(response.form)
    return [user, basicQuest]
  }
  return [user, null]
}
