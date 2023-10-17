import { Message } from './message'
import { type UserDto } from './user'

export type Recipient = UserDto & {
  email: string
  isActiveProfile: boolean | null
}

// чат - комната
export interface Chat {
  id: number
  recipient: Recipient
  // Determines whether you send the last message or not
  isYoursMessage: boolean
  lastMessage: Message
}
