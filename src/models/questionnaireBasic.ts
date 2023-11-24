import { type Apartment } from './apartment'
import { type City, type Country, type District } from './location'
import { type ShortUser } from './user'

export type Companion = string | ShortUser
export interface WhoFriends {
  count: number
  people: Companion[] | undefined
}

export type CoupleType = 'MF' | 'MM' | 'FF' | 'other'

export interface WhoCouple {
  kind?: CoupleType
  partner: Companion | undefined
}

export interface WhoFamily {
  adults: number
  kids: number
  people: Companion[] | undefined
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

export type RelationsType = 'Friends' | 'Couple' | 'Family' | 'Alone'

export type WhatSmoke = 'Cigarettes' | 'Vape' | 'Shisha' | 'Cigars' | 'Other'

export type SleepingHabits = 'Owl' | 'Lark' | 'Other'

export type Alcoholic = 'Against drink'
| 'Not against drink'
| 'Partly drink'
| 'Sometimes drink'
| 'Other'

export type GuestAttitude = 'Like guests'
| 'Sometimes'
| 'Prefer without guests'
| 'No guests at all'

export interface QuestionnaireBasicType {
  id: number
  who: RelationsType | null
  countKids: number | null
  countAdults: number | null
  whoContains?: WhoFriends | WhoFamily | WhoCouple
  havePets?: boolean
  pets?: Pet[]
  smoker?: boolean
  smokingWhat: WhatSmoke[]
  languages: string[]
  sleepingHabits: SleepingHabits | null
  alcohol: Alcoholic | null
  about: string
  apartment: Apartment | null
  guests: GuestAttitude | null
  location: {
    country: Country | null
    state: District | null
    city: City | null
  }
}
