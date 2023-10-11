import { Client, type IFrame, type IMessage } from '@stomp/stompjs'
import { type NewMessage } from '../dto/message'

// Service for dialog based interaction

export class StompChatService {
  public stompClientErrorCallback?: (args: any) => void = undefined

  public client: Client = new Client({
    brokerURL: 'wss://app.roommate.host/wss',
    // connectHeaders: {
    //   Authorization: sessionService.authToken
    // },
    debug: (str: any) => {
      console.log(str)
    }
  })

  public connect (
    userId: number,
    messageReceiveCallback: (message: IMessage) => void,
    stompClientErrorCallback?: (args: any) => void,
    webSocketErrorCallback?: (args: any) => void
  ): void {
    this.client.activate()
    this.client.onConnect = () => {
      this.client.subscribe(
        `/user/${userId}/queue/messages`,
        messageReceiveCallback
      )
    }

    this.client.onStompError = (frame: IFrame): void => {
      console.log('Broker reported error: ' + frame.headers.message)
      console.log('Additional details: ' + frame.body)
      stompClientErrorCallback
    }

    this.client.onWebSocketError = (): void => {
      webSocketErrorCallback
    }
  }

  public disconnect (): void {
    void this.client.deactivate()
  }

  public publishMessage (message: NewMessage): void {
    this.client.publish({
      destination: '/app/chat',
      body: JSON.stringify(message)
    })
  }
}

export const stompChat = new StompChatService()
