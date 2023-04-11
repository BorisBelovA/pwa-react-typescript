import * as models from 'models'
import * as dto from '../dto/questionnaire'

export const mapSmokeToDto = (smoke: models.WhatSmoke): dto.SmokeEnum => {
  switch (smoke) {
    case 'cigarettes': {
      return dto.SmokeEnum.SIGARETTES
    }
    case 'shisha': {
      return dto.SmokeEnum.SHISHA
    }
    case 'vape': {
      return dto.SmokeEnum.VAPE
    }
    case 'other': {
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

export const mapSmokeToModel = (smoke: dto.SmokeEnum): models.WhatSmoke => {
  switch (smoke) {
    case dto.SmokeEnum.SIGARETTES: {
      return 'cigarettes'
    }
    case dto.SmokeEnum.VAPE: {
      return 'vape'
    }
    case dto.SmokeEnum.SHISHA: {
      return 'shisha'
    }
    case dto.SmokeEnum.OTHER: {
      return 'other'
    }
    default: {
      throw new Error('Unknown smoke DTO value!')
    }
  }
}

export const mapPetToDto = (pet: models.PetType): dto.PetEnum => {
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

export const mapPetToModel = (pet: dto.PetEnum): models.PetType => {
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
      throw new Error('Unknown pet DTO value!')
    }
  }
}

export const mapContactToDto = (contact: models.ContactType): dto.ContactEnum => {
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

export const mapContactToModel = (contact: dto.ContactEnum): models.ContactType => {
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

export const mapQuestionnaireToDto = (questionnaire: models.QuestionnaireBasicType): dto.Questionnaire => {
  return {
    isHavePets: questionnaire.havePets ?? false,
    petTypes: questionnaire.pets ? questionnaire.pets.map(p => mapPetToDto(p.type)) : [],
    isSmoke: questionnaire.smoker ?? false,
    smokeTypes: questionnaire.smokingWhat.map(s => mapSmokeToDto(s)),
    languageTypes: [1],
    aboutMe: questionnaire.about,
    contactTypes: questionnaire.contacts.map(c => mapContactToDto(c.type)),
    ageFrom: 18,
    ageTo: 9999,
    isHaveApartment: false,
    country: 'Russia',
    city: 'Moscow',
    priceFrom: 1,
    priceTo: 9999,
    currency: dto.CurrencyEnum.USD,
    sleepingHabits: dto.SleepingHabitsEnum.LARK,
    alcoholic: dto.AlchoholicEnum.OTHER,
    guests: dto.GuestsEnum.LIKE,
    occupation: dto.OccupationEnum.OTHER,
    householdType: dto.HouseholdEnum.JOINT,
    likeSmokers: false,
    meetingType: dto.MeetingEnum.ONLINE
  }
}
