export type Gender = 'M' | 'F' | 'Other'

//bikiv33831@meogl.com
//qwerty123

//dakos71134@niback.com
//qwerty123

//kiroca7086@nasskar.com
//qwerty123

//bekobi7445@rc3s.com
// qwerty123

//meyawo6943@quipas.com
// qwerty123

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