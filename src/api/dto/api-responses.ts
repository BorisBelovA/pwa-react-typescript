import { type Apartment } from './apartment'
import { type Questionnaire } from './questionnaire'
import { type UserDto } from './user'

export type AuthenticatedUserData = UserDto & {
  form: Questionnaire
  apartment: Apartment
}
