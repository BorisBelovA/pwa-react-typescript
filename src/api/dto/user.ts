export type UserRoles = 'USER_ROLE' | 'Admin'
export type UserGender = 'MALE' | 'FEMALE' | 'OTHER'

export interface UserForm {
  firstName: string | null
  lastName: string | null
  gender: UserGender | null
  birthday: string | null
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
  // Пока это мб и не надо на фронте
  // role: string
  // isActiveProfile: boolean
}