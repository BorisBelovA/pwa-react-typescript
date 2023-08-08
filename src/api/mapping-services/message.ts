import { type Message } from 'models'
import { type Message as dtoMessage } from '../dto/message'
import moment from 'moment'

export const mapMessageToModel = (message: dtoMessage): Message => {
  const zoneOffset = new Date().getTimezoneOffset()

  return {
    content: message.content,
    senderId: message.senderId,
    status: message.status,
    timestamp: moment(message.timestamp, 'YYYY-MM-DDTHH:mm:ss')
      .add(zoneOffset < 0 ? zoneOffset * -1 : zoneOffset, 'minutes')
      .toDate()
  }
}
