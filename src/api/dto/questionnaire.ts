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

/** */

export interface Questionnaire {
  isHavePets: boolean
  petTypes: PetEnum[]
  isSmoke: boolean
  smokeTypes: SmokeEnum[]
  languageTypes: [1]
  aboutMe: string
  contactTypes: ContactEnum[]
  ageFrom: number
  ageTo: number
  isHaveApartment: boolean
  country: string
  city: string
  priceFrom: number
  priceTo: number
  currency: CurrencyEnum
  sleepingHabits: SleepingHabitsEnum
  alcoholic: AlchoholicEnum
  guests: GuestsEnum
  occupation: OccupationEnum
  householdType: HouseholdEnum
  likeSmokers: boolean
  meetingType: MeetingEnum
}

export type CreateQuestFormResponse = Questionnaire & { 
  id: number
  owner: {

  }
}
