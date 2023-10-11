import { type Message } from 'models'

export class ChatMessageListener {
  public type: 'Global' | 'ChatRoom' | 'ChatsPage' = 'Global'
  public callback!: (message: Message) => void

  constructor (
    callback: (args: any) => void,
    type?: 'Global' | 'ChatRoom' | 'ChatsPage'
  ) {
    this.callback = callback
    this.type = type ?? 'Global'
  }
}

export class ChatMessages {
  private _queue: Message[] = []

  private listeners: ChatMessageListener[] = []

  public get queue (): Message[] {
    return this._queue
  }

  public addMessageToQueue (message: Message): void {
    this._queue.push(message)
    this.listeners.forEach(l => { l.callback(message) })
  }

  public subscribe (listener: ChatMessageListener): void {
    if (this.listeners.every(l => l.type !== listener.type)) {
      this.listeners.push(listener)
    }
  }

  public removeMessagesByChatRoom (roomId: number): void {
    this._queue = this._queue.filter(m => m.chatRoomId !== roomId)
  }

  public unsubscribe (listenerType: 'Global' | 'ChatRoom' | 'ChatsPage'): void {
    this.listeners = this.listeners.filter(l => l.type !== listenerType)
  }
}

export const chatMessagesQueue = new ChatMessages()
