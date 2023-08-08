import { type Apartment } from './apartment'
import { type City, type Country, type District } from './location'

export const enum PetEnum {
  CAT = 'CAT',
  DOG = 'DOG',
  OTHER = 'OTHER'
  // надо попросить ребят добавить остальные типы
  // fish | bird
}

export const enum SmokeEnum {
  SHISHA = 'SHISHA',
  VAPE = 'VAPE',
  SIGARETTES = 'SIGARETTES',
  OTHER = 'OTHER'
}

export const enum ContactEnum {
  EMAIL = 'EMAIL',
  TELEGRAM = 'TELEGRAM',
  PHONE = 'PHONE',
  FACEBOOK = 'FACEBOOK',
  INSTAGRAM = 'INSTAGRAM',
  OTHER = 'OTHER'
}

export const enum CurrencyEnum {
  USD = 'USD',
  EUR = 'EUR',
}

export const enum SleepingHabitsEnum {
  OWL = 'OWL',
  LARK = 'LARK',
  OTHER = 'OTHER',
}

export const enum AlchoholicEnum {
  AGAINST_DRINK = 'AGAINST_DRINK',
  NOT_AGAINST_DRINK = 'NOT_AGAINST_DRINK',
  SOMETIMES_DRINK = 'SOMETIMES_DRINK',
  PARTLY_DRINK = 'PARTLY_DRINK',
  ABUSER = 'ABUSER',
  OTHER = 'OTHER'
}

export const enum GuestsEnum {
  LIKE = 'LIKE',
  SOMETIMES = 'SOMETIMES',
  PREFER_NOT_INVITE = 'PREFER_NOT_INVITE',
  AGAINST_IT = 'AGAINST_IT',
}

export const enum OccupationEnum {
  INFORMATION_TECHNOLOGY = 'INFORMATION_TECHNOLOGY',
  OTHER = 'OTHER'
}

export const enum HouseholdEnum {
  JOINT = 'JOINT',
  SEPARATE = 'SEPARATE',
}

export const enum MeetingEnum {
  ONLINE = 'ONLINE',
  PERSON = 'PERSON'
}

export const enum WhoLooking {
  JUST_ME = 'JUST_ME',
  COUPLE = 'COUPLE',
  FAMILY = 'FAMILY',
  FRIENDS = 'FRIENDS',
}

export interface Questionnaire {
  id: number
  whoLooking: WhoLooking | null
  isHavePets: boolean
  petTypes: PetEnum[]
  isSmoke: boolean
  smokeTypes: SmokeEnum[]
  languageTypes: string[]
  aboutMe: string
  contactTypes: ContactEnum[] | null
  isHaveApartment: boolean
  countKids: number | null
  countAdults: number | null
  country: Country | null
  cities: City[] | null
  state: District | null
  sleepingHabits: SleepingHabitsEnum | null
  alcoholic: AlchoholicEnum | null
  guests: GuestsEnum | null
  occupation: OccupationEnum | null
  apartment: Apartment | null
}
