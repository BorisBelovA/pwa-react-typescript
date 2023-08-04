export interface Message {
  chatRoomId: number
  content: string
  // id: number
  recipientId: number
  senderId: number
  status: 'DELIVERED' | 'SENT'
  timestamp: string
}

export type NewMessage = Omit<Message, 'id'>
