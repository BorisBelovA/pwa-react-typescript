import { type Message } from './message'

export interface Recipient {
  id: number
  email: string
  firstName: string
  lastName: string
  avatar: string | null
}

export interface Chat {
  roomId: number
  recipient: Recipient
  isYoursMessage: boolean
  lastMessage: Message | null
  unreadMessages: number
}
