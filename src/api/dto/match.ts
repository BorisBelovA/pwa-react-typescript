import { type Questionnaire } from './questionnaire'
import { type UserDto } from './user'

export type Match = Questionnaire & {
  user: UserDto
}
