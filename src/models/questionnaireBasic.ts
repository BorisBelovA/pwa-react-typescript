import { User } from "./user"

export interface WhoFriends {
  count: number
  people: (string | User)[]
}

export type CoupleType = 'MF' | 'MM' | 'FF' | 'other'
export interface WhoCouple {
  kind?: CoupleType
  partner: string | User
}
export interface WhoFamily {
  adults: number
  kids: number
  people: (string | User)[]
}

export type PetType = 'cat' | 'dog' | 'fish' | 'bird' | 'other'
export interface Pet {
  type: PetType
  count: number
}

export type ContactType = 'email' | 'phone' | 'telegram' | 'instagram' | 'other'

export interface Contact {
  type: ContactType
  contact: string
  hidden: boolean
}

export type RelationsType = 'Friends' | 'Couple' | 'Family' | 'Alone' | undefined

export interface QuestionnaireBasicType {
  who: RelationsType
  whoContains?: WhoFriends | WhoFamily | WhoCouple
  havePets?: boolean
  pets?: Pet[]
  smoker?: boolean
  smokingWhat: string[]
  languages: string[]
  about: string
  contacts: Contact[]
  apartment?: boolean
}

/*
Users Questionnaire
  Basic Info
    Name
    Surname
    Gender
    Birthday
  Personal Info
    who's looking
    pets
      have pets?
      type of pets
    smoke
      do you smoke?
      types of smoke
    languages
    about
  Additional Info
    sleeping habbits
    alchohol?
    like guests?
    work
  Contacts
    Email
    Telegram
    Phone
    FB
    Instagram
    Other? Мне кажется, что можно выпилить
*/
