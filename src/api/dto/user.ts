export type UserRoles = 'USER_ROLE' | 'Admin'
export type UserGender = 'MALE' | 'FEMALE' | 'OTHER'

export interface UserForm {
  email: string
  password: string
  firstName: string
  lastName: string
  gender: UserGender
  birthday: string
  phone?: string
  photo?: string
  avatar?: string
}

export type UserDto = UserForm & {
  id: number
  // Пока это мб и не надо на фронте
  // role: string
  // isActiveProfile: boolean
}