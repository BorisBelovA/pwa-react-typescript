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
    firstName: model.firstName,
    lastName: model.lastName,
    gender: mapGenderToDto(model.gender),
    birthday: moment(model.birthday).format('YYYY-MM-DD'),
    phone: model.phone ?? null,
    photo: model.photo ?? null,
    avatar: model.avatar ?? null
  }
}

export const mapUserToModel = (dto: dto.UserDto): models.AuthUser => {
  return {
    id: dto.id,
    firstName: dto.firstName ?? '',
    lastName: dto.lastName ?? '',
    gender: dto.gender ? mapGenderToModel(dto.gender) : 'M',
    birthday: new Date(),
    phone: dto.phone ?? null,
    photo: dto.photo ?? null,
    avatar: dto.avatar ?? null
  }
}

export async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {

  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: 'image/png' });
}
export const mapBase64ToFile = async (base64: string, name: string): Promise<File> => {
  const res: Response = await fetch(base64)
  const blob: Blob = await res.blob()
  return new File([blob], name, { type: 'image/png' })
}
