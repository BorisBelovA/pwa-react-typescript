export const enum PetEnum {
  CAT = 1,
  DOG = 2,
  OTHER = 3
  // надо попросить ребят добавить остальные типы
  // fish | bird
}

export const enum SmokeEnum {
  SHISHA = 1,
  VAPE = 2,
  SIGARETTES = 3,
  OTHER = 4
}

export const enum ContactEnum {
  EMAIL = 1,
  TELEGRAM = 2,
  PHONE = 3,
  FACEBOOK = 4,
  INSTAGRAM = 5,
  OTHER = 6
}

export const enum CurrencyEnum {
  USD = 1,
  EUR = 2,
}

export const enum SleepingHabitsEnum {
  OWL = 1,
  LARK = 2,
  OTHER = 3,
}

export const enum AlchoholicEnum {
  AGAINST_DRINK = 1,
  NOT_AGAINST_DRINK = 2,
  SOMETIMES_DRINK = 3,
  PARTLY_DRINK = 4,
  ABUSER = 5,
  OTHER = 6
}

export const enum GuestsEnum {
  LIKE = 1,
  SOMETIMES = 2,
  PREFER_NOT_INVITE = 3,
  AGAINST_IT = 4,
}

export const enum OccupationEnum {
  INFORMATION_TECHNOLOGY = 1,
  OTHER = 2
}

export const enum HouseholdEnum {
  JOINT = 1,
  SEPARATE = 2,
}

export const enum MeetingEnum {
  ONLINE = 1,
  PERSON = 2
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
