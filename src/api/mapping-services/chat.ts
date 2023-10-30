import type * as dto from 'dto'
import type * as models from 'models'
import { mapPhotoNameToURI } from './file-mapping'
import { mapMessageToModel } from './message'

export const mapRecipientToModel = (recipient: dto.Recipient): models.Recipient => {
  // if (!recipient.firstName || !recipient.lastName || !recipient.gender || !recipient.birthday) {
  //   throw new Error(`Not enough data for recipient with Id = ${recipient.id}`)
  // }
  return {
    id: recipient.id,
    firstName: recipient.firstName ?? '',
    lastName: recipient.lastName ?? '',
    email: recipient.email,
    avatar: recipient.avatar ? mapPhotoNameToURI(recipient.avatar) : null
  }
}

export const mapChatToModel = (chat: dto.Chat): models.Chat => {
  return {
    roomId: chat.id,
    recipient: mapRecipientToModel(chat.recipient),
    isYoursMessage: chat.isYoursMessage,
    lastMessage: chat.lastMessage
      ? mapMessageToModel(chat.lastMessage)
      : null,
    unreadMessages: 0
  }
}
