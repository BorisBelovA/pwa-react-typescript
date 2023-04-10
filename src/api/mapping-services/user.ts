import type * as models from 'models'
import type * as dto from 'dto'
import moment from 'moment'

export const mapGenderToModel = (dto: dto.UserGender): models.Gender => {
  return dto === 'MALE'
    ? 'M'
    : dto === 'FEMALE'
      ? 'F'
      : 'Other'
}

export const mapGenderToDto = (model: models.Gender): dto.UserGender => {
  return model === 'M'
    ? 'MALE'
    : model === 'F'
      ? 'FEMALE'
      : 'OTHER'
}

export const mapUserToDto = (model: models.AuthUser): dto.UserDto => {
  return {
    id: model.id,
    email: model.email,
    password: model.password,
    firstName: model.firstName,
    lastName: model.lastName,
    gender: mapGenderToDto(model.gender),
    birthday: moment(model.birthday).format('YYYY-MM-DD'),
    phone: model.phone ?? undefined,
    photo: model.phone ?? undefined
  }
}

export const mapUserToModel = (dto: dto.UserDto): models.AuthUser => {
  return {
    id: dto.id,
    email: dto.email,
    password: dto.password,
    firstName: dto.firstName,
    lastName: dto.lastName,
    gender: mapGenderToModel(dto.gender),
    birthday: new Date(),
    phone: dto.phone ?? null,
    photo: dto.photo ?? null,
    avatar: null
  }
}

export const mapUserFormToDto = (model: models.UserForm): dto.UserInfo => {
  return {
    email: model.email,
    password: model.password,
    firstName: model.firstName,
    lastName: model.lastName,
    gender: mapGenderToDto(model.gender),
    birthday: moment(model.birthday).format('YYYY-MM-DD'),
    phone: model.phone ?? undefined,
    photo: model.photo ?? undefined
  }
}
