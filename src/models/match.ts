import { type QuestionnaireBasicType } from './questionnaireBasic'
import { type AuthUser } from './user'

export interface Match {
  name: string
  age: number
  location: {
    city: string
    country: string
  }
  contacts: {
    email?: string
    telegram?: string
    telephone?: string
    facebook?: string
    instagram?: string
  }
}

export interface MatchNew {
  user: AuthUser
  form: QuestionnaireBasicType
}
