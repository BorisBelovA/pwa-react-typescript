export type UserRoles = 'USER_ROLE' | 'Admin'
export type UserGender = 'MALE' | 'FEMALE' | 'OTHER'

export interface UserPersonalData {
  firstName: string | null
  lastName: string | null
  gender: UserGender | null
  birthday: string | null
}

export type UserForm = UserPersonalData & {
  phone: string | null
  photo: string | null
  avatar: string | null
}

export interface UserCredentials {
  email: string
  password: string
}

export type UserDto = UserForm & {
  id: number
}
