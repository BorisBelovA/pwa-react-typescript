export type UserRoles = 'USER_ROLE' | 'Admin'
export type UserGender = 'MALE' | 'FEMALE' | 'OTHER'

export interface UserInfo {
  email: string
  password: string
  firstName: string
  lastName: string
  gender: UserGender
  birthday: string
  phone?: string
  photo?: string
}

export type UserDto = UserInfo & {
  id: number
}
