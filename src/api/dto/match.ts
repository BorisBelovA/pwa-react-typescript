import { type Questionnaire } from './questionnaire'
import { type UserDto } from './user'

export interface Match {
  user: UserDto
  form: Questionnaire
}
