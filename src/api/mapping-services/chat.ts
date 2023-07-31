import * as dto from 'dto'
import * as models from 'models'
import { mapGenderToModel } from './user'
import moment from 'moment'
import { mapPhotoNameToURI } from './file-mapping'

export const mapRecipientToModel = (recipient: dto.Recipient): models.Recipient => {
  // if (!recipient.firstName || !recipient.lastName || !recipient.gender || !recipient.birthday) {
  //   throw new Error(`Not enough data for recipient with Id = ${recipient.id}`)
  // }
  return {
    id: recipient.id,
    firstName: recipient.firstName ?? '',
    lastName: recipient.lastName ?? '',
    gender: mapGenderToModel(recipient.gender ?? 'FEMALE'),
    birthday: moment(`${recipient.birthday}:24:00:00`, 'YYYY-MM-DD:hh:mm:ss').toDate(),
    email: recipient.email,
    phone: null,
    photo: null,
    avatar: recipient.avatar ? mapPhotoNameToURI(recipient.avatar) : null,
    isActiveProfile: null
  }
}

export const mapChatToModel = (chat: dto.Chat): models.Chat => {
  return {
    roomId: chat.id,
    recipient: mapRecipientToModel(chat.recipient)
  }
}
