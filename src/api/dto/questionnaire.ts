export const enum PetEnum {
  CAT,
  DOG,
  OTHER
  // надо попросить ребят добавить остальные типы
  // fish | bird
}

export const enum SmokeEnum {
  SHISHA,
  VAPE,
  SIGARETTES,
  OTHER
}

export const enum ContactEnum {
  EMAIL,
  TELEGRAM,
  PHONE,
  FACEBOOK,
  INSTAGRAM,
  OTHER
}

export const enum CurrencyEnum {
  USD,
  EUR,
}

export const enum SleepingHabitsEnum {
  OWL,
  LARK,
  OTHER,
}

export const enum AlchoholicEnum {
  AGAINST_DRINK,
  NOT_AGAINST_DRINK,
  SOMETIMES_DRINK,
  PARTLY_DRINK,
  ABUSER,
  OTHER
}

export const enum GuestsEnum {
  LIKE,
  SOMETIMES,
  PREFER_NOT_INVITE,
  AGAINST_IT,
}

export const enum OccupationEnum {
  INFORMATION_TECHNOLOGY,
  OTHER
}

export const enum HouseholdEnum {
  JOINT,
  SEPARATE,
}

export const enum MeetingEnum {
  ONLINE,
  PERSON
}

/** */

export type Questionnaire = {
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

export type CreateQuestFormResponse = Questionnaire &{ 
  id: number
  owner: {

  }
}
