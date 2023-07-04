export type Gender = 'M' | 'F' | 'Other'

//sewig18705@bodeem.com
//qwerty123

//bikibej224@fitwl.com
//qwerty123

export interface PersonalInfo {
  firstName: string
  lastName: string
  gender: Gender
  birthday: Date
}

export interface ShortUser {
  name: string
  age: number
}

export type User = PersonalInfo & {
  phone: string | null
  photo: string | null
  avatar: string | null
}

export interface UserCredentials {
  email: string
  password: string
}

export type AuthUser = User & {
  id: number
}

// Additional types for non-registered user
export type EmptyPersonalInfo = {
  [key in keyof PersonalInfo]: PersonalInfo[key] | undefined
}

export type NewUser = {
  [key in keyof User]: User[key] | undefined
}
///