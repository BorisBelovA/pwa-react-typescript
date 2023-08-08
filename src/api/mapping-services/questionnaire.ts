import type * as models from 'models'
import * as dto from '../dto/questionnaire'
import { mapApartmentToDto, mapApartmentToModel } from './appartments'

// Smoke mapper
export const mapSmokeTypeToDto = (smoke: models.WhatSmoke): dto.SmokeEnum => {
  switch (smoke) {
    case 'Cigarettes': {
      return dto.SmokeEnum.SIGARETTES
    }
    case 'Shisha': {
      return dto.SmokeEnum.SHISHA
    }
    case 'Vape': {
      return dto.SmokeEnum.VAPE
    }
    case 'Other': {
      return dto.SmokeEnum.OTHER
    }
    default: {
      console.warn('Unknown smoke model value!')
      // До стабилизации типов мапим на other
      console.warn(`Map ${smoke} to Other`)
      return dto.SmokeEnum.OTHER
    }
  }
}

export const mapSmokeTypeToModel = (smoke: dto.SmokeEnum): models.WhatSmoke => {
  switch (smoke) {
    case dto.SmokeEnum.SIGARETTES: {
      return 'Cigarettes'
    }
    case dto.SmokeEnum.VAPE: {
      return 'Vape'
    }
    case dto.SmokeEnum.SHISHA: {
      return 'Shisha'
    }
    case dto.SmokeEnum.OTHER: {
      return 'Other'
    }
    default: {
      throw new Error('Unknown smoke DTO value!')
    }
  }
}
// End smoke mapper

// Pet mapper
export const mapPetTypeToDto = (pet: models.PetType): dto.PetEnum => {
  switch (pet) {
    case 'dog': {
      return dto.PetEnum.DOG
    }
    case 'cat': {
      return dto.PetEnum.CAT
    }
    case 'bird':
    case 'fish':
    case 'other': {
      return dto.PetEnum.OTHER
    }
    default: {
      console.warn('Unknown pet model value!')
      // До стабилизации типов мапим на other
      console.warn(`Map ${pet} to Other`)
      return dto.PetEnum.OTHER
    }
  }
}

export const mapPetTypeToModel = (pet: dto.PetEnum): models.PetType => {
  switch (pet) {
    case dto.PetEnum.DOG: {
      return 'dog'
    }
    case dto.PetEnum.CAT: {
      return 'cat'
    }
    case dto.PetEnum.OTHER: {
      return 'other'
    }
    default: {
      throw new Error(`Unknown pet DTO value! ${pet}`)
    }
  }
}
// End Pet mapper

// Contact mapper
export const mapContactTypeToDto = (contact: models.ContactType): dto.ContactEnum => {
  switch (contact) {
    case 'email': {
      return dto.ContactEnum.EMAIL
    }
    case 'instagram': {
      return dto.ContactEnum.INSTAGRAM
    }
    case 'phone': {
      return dto.ContactEnum.PHONE
    }
    case 'telegram': {
      return dto.ContactEnum.TELEGRAM
    }
    case 'other': {
      return dto.ContactEnum.OTHER
    }
    default: {
      console.warn('Unknwown contact model value!')
      // До стабилизации типов мапим на other
      console.warn(`Map ${contact} to Other`)
      return dto.ContactEnum.OTHER
    }
  }
}

export const mapContactTypeToModel = (contact: dto.ContactEnum): models.ContactType => {
  switch (contact) {
    case dto.ContactEnum.EMAIL: {
      return 'email'
    }
    case dto.ContactEnum.INSTAGRAM: {
      return 'instagram'
    }
    case dto.ContactEnum.PHONE: {
      return 'phone'
    }
    case dto.ContactEnum.TELEGRAM: {
      return 'telegram'
    }
    case dto.ContactEnum.FACEBOOK:
    case dto.ContactEnum.OTHER: {
      return 'other'
    }
    default: {
      throw new Error('Unknown contact DTO value!')
    }
  }
}
// End contact mapper

// Who looking mapper
export const mapWhoLookingToDto = (who: models.RelationsType): dto.WhoLooking => {
  switch (who) {
    case 'Alone':
      return dto.WhoLooking.JUST_ME
    case 'Couple':
      return dto.WhoLooking.COUPLE
    case 'Family':
      return dto.WhoLooking.FAMILY
    case 'Friends':
      return dto.WhoLooking.FRIENDS
    default:
      throw new Error('Unknown WhoLooking type')
  }
}

export const mapWhoLookingToModel = (who: dto.WhoLooking): models.RelationsType => {
  switch (who) {
    case dto.WhoLooking.JUST_ME:
      return 'Alone'
    case dto.WhoLooking.COUPLE:
      return 'Couple'
    case dto.WhoLooking.FAMILY:
      return 'Family'
    case dto.WhoLooking.FRIENDS:
      return 'Friends'
    default:
      throw new Error('Unknown WhoLooking dto')
  }
}
// End who looking mapper

// Guest mapper
export const mapGuestToModel = (guest: dto.GuestsEnum): models.GuestAttitude => {
  switch (guest) {
    case dto.GuestsEnum.AGAINST_IT: {
      return 'No guests at all'
    }
    case dto.GuestsEnum.LIKE: {
      return 'Like guests'
    }
    case dto.GuestsEnum.PREFER_NOT_INVITE: {
      return 'Prefer without guests'
    }
    case dto.GuestsEnum.SOMETIMES: {
      return 'Sometimes'
    }
    default: {
      throw new Error('unknown guest type')
    }
  }
}

export const mapGuestToDto = (guest: models.GuestAttitude): dto.GuestsEnum => {
  switch (guest) {
    case 'Like guests': {
      return dto.GuestsEnum.LIKE
    }
    case 'No guests at all': {
      return dto.GuestsEnum.AGAINST_IT
    }
    case 'Prefer without guests': {
      return dto.GuestsEnum.PREFER_NOT_INVITE
    }
    case 'Sometimes': {
      return dto.GuestsEnum.SOMETIMES
    }
    default: {
      throw new Error('Unknown guest type')
    }
  }
}
// End Guest mapper

// Alco mapper
export const mapAlcoEnumToModel = (alco: dto.AlchoholicEnum): models.Alcoholic => {
  switch (alco) {
    case dto.AlchoholicEnum.AGAINST_DRINK: {
      return 'Against drink'
    }
    case dto.AlchoholicEnum.NOT_AGAINST_DRINK: {
      return 'Not against drink'
    }
    case dto.AlchoholicEnum.PARTLY_DRINK: {
      return 'Partly drink'
    }
    case dto.AlchoholicEnum.SOMETIMES_DRINK: {
      return 'Sometimes drink'
    }
    case dto.AlchoholicEnum.OTHER: {
      return 'Other'
    }
    case dto.AlchoholicEnum.ABUSER: {
      return 'ARBUSER'
    }
    default: {
      throw new Error('Unknown alcoholic type')
    }
  }
}

export const mapAlcoToDto = (alco: models.Alcoholic): dto.AlchoholicEnum => {
  switch (alco) {
    case 'ARBUSER': {
      return dto.AlchoholicEnum.ABUSER
    }
    case 'Against drink': {
      return dto.AlchoholicEnum.AGAINST_DRINK
    }
    case 'Not against drink': {
      return dto.AlchoholicEnum.NOT_AGAINST_DRINK
    }
    case 'Other': {
      return dto.AlchoholicEnum.OTHER
    }
    case 'Partly drink': {
      return dto.AlchoholicEnum.PARTLY_DRINK
    }
    case 'Sometimes drink': {
      return dto.AlchoholicEnum.SOMETIMES_DRINK
    }
    default: {
      throw new Error('Unknown alco type')
    }
  }
}
// End Alco mapper

// Sleeping habits mapper
export const mapSleepingHabitsToModel = (habit: dto.SleepingHabitsEnum): models.SleepingHabits => {
  switch (habit) {
    case dto.SleepingHabitsEnum.LARK: {
      return 'Lark'
    }
    case dto.SleepingHabitsEnum.OTHER: {
      return 'Other'
    }
    case dto.SleepingHabitsEnum.OWL: {
      return 'Owl'
    }
    default: {
      throw new Error('Unknown sleeping habit')
    }
  }
}

export const mapSleepingHabitToDto = (habit: models.SleepingHabits): dto.SleepingHabitsEnum => {
  switch (habit) {
    case 'Lark': {
      return dto.SleepingHabitsEnum.LARK
    }
    case 'Owl': {
      return dto.SleepingHabitsEnum.OWL
    }
    case 'Other': {
      return dto.SleepingHabitsEnum.OTHER
    }
    default: {
      throw new Error('Unknown sleeping habit')
    }
  }
}
// End Sleeping habits mapper

export const mapQuestionnaireToDto = (questionnaire: models.QuestionnaireBasicType): dto.Questionnaire => {
  return {
    id: questionnaire.id,
    apartment: questionnaire.apartment
      ? mapApartmentToDto(questionnaire.apartment)
      : null,
    whoLooking: questionnaire.who
      ? mapWhoLookingToDto(questionnaire.who)
      : null,
    isHavePets: questionnaire.havePets ?? false,
    petTypes: questionnaire.pets ? questionnaire.pets.map(p => mapPetTypeToDto(p.type)) : [],
    isSmoke: questionnaire.smoker ?? false,
    smokeTypes: questionnaire.smokingWhat.map(s => mapSmokeTypeToDto(s)) ?? [],
    languageTypes: questionnaire.languages.map(l => l.toUpperCase()),
    aboutMe: questionnaire.about,
    contactTypes: [dto.ContactEnum.TELEGRAM],
    isHaveApartment: false,
    country: questionnaire.location.country,
    cities: questionnaire.location.city
      ? [questionnaire.location.city]
      : null,
    state: questionnaire.location.state,
    sleepingHabits: questionnaire.sleepingHabits
      ? mapSleepingHabitToDto(questionnaire.sleepingHabits)
      : null,
    alcoholic: questionnaire.alcohol
      ? mapAlcoToDto(questionnaire.alcohol)
      : null,
    guests: questionnaire.guests
      ? mapGuestToDto(questionnaire.guests)
      : null,
    occupation: dto.OccupationEnum.OTHER,
    countAdults: questionnaire.countAdults,
    countKids: questionnaire.countKids
  }
}

export const mapQuestionnaireToModel = (questionnaire: dto.Questionnaire): models.QuestionnaireBasicType => {
  return {
    id: questionnaire.id,
    who: questionnaire.whoLooking
      ? mapWhoLookingToModel(questionnaire.whoLooking)
      : null,
    whoContains: undefined,
    havePets: questionnaire.isHavePets,
    pets: mapPetToModel(questionnaire.petTypes),
    smoker: questionnaire.isSmoke,
    smokingWhat: questionnaire.smokeTypes?.map(s => mapSmokeTypeToModel(s)) ?? [],
    languages: questionnaire.languageTypes.map(l => `${l[0].toUpperCase()}${l.slice(1).toLowerCase()}`),
    about: questionnaire.aboutMe,
    sleepingHabits: questionnaire.sleepingHabits
      ? mapSleepingHabitsToModel(questionnaire.sleepingHabits)
      : null,
    alcohol: questionnaire.alcoholic
      ? mapAlcoEnumToModel(questionnaire.alcoholic)
      : null,
    guests: questionnaire.guests
      ? mapGuestToModel(questionnaire.guests)
      : null,
    apartment: questionnaire.apartment
      ? mapApartmentToModel(questionnaire.apartment)
      : null,
    countAdults: questionnaire.countAdults,
    countKids: questionnaire.countKids,
    location: {
      country: questionnaire.country,
      state: questionnaire.state,
      city: questionnaire?.cities && questionnaire.cities[0]
        ? questionnaire.cities[0]
        : null
    }
  }
}

export const mapPetToModel = (pets: dto.PetEnum[]): models.Pet[] => {
  const record: Record<models.PetType, number> = {
    other: 0,
    cat: 0,
    dog: 0,
    fish: 0,
    bird: 0
  }
  pets.forEach(p => {
    const type = mapPetTypeToModel(p)
    record[type]++
  })
  return Object.entries(record).map(([type, count]) => ({ type, count } as models.Pet))
}

export const mapContactsToModel = (contacts: dto.ContactEnum[]): models.Contact[] => {
  return contacts.map(c => ({
    type: mapContactTypeToModel(c),
    hidden: false,
    contact: ''
  }))
}
