import { Box } from '@mui/material'
import styles from './Chat.module.scss'
import { useEffect, useRef, useState } from 'react'
import { type Message } from 'models'
import { ChatMessage } from './components/ChatMessage'
import { ChatHeader } from './components/ChatHeader'
import { ChatFooter } from './components/ChatFooter'
import { useSearchParams } from 'react-router-dom'
import { chatService, sessionService } from 'api-services'

import SockJS from 'sockjs-client'
import { Client, CompatClient, IFrame, Stomp } from '@stomp/stompjs'
import { useStore } from 'src/utils/StoreProvider'
import { observer } from 'mobx-react-lite'

const INITIAL_MESSAGES: Message[] = [
  {
    text: 'Hey buddy!',
    mine: true,
    date: new Date(),
    read: true
  },
  {
    text: 'Hello hello! How\'s it going?',
    mine: false,
    date: new Date(),
    read: true
  },
  {
    text: 'So far so good. Haven\'t seen you a long time. Do you want to hang out?',
    mine: true,
    date: new Date(),
    read: true
  },
  {
    text: 'Sure! Where and when?',
    mine: false,
    date: new Date(),
    read: true
  },
  {
    text: 'Tomorrow at 8 PM. I\'ll send you the location a bit later!',
    mine: true,
    date: new Date(),
    read: false
  }
]

var stompClient: Client | null = null

export const Chat = observer((): JSX.Element => {
  const [searchParams] = useSearchParams()
  const { userStore } = useStore()
  const lastMessageRef = useRef<HTMLDivElement | null>(null)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const sendMessage = (text: string): void => {
    setMessages(
      messages.concat({
        text,
        mine: true,
        date: new Date(),
        read: false
      })
    )
  }

  const getMessages = async (chatId: number): Promise<void> => {
    const messages = await chatService.getMessagesInChat(chatId)
    setMessages(messages)
  }

  const onConnected = (): void => {
    console.log('connected')
    console.log(userStore.user.id)
    if (stompClient) {
      stompClient.subscribe(
        `/user/${userStore.user.id}/queue/messages`,
        // onMessageReceived
        (message) => {
          console.log('message recieved', message)
        }
      )
    }
  }

  const onError = (err: Error): void => {
    console.log(err)
  }

  const connect = (): void => {
    // const sockJS = new SockJS("http://194.58.109.74:8080/ws")
    // stompClient = Stomp.over(sockJS)
    
    if (!sessionService.authToken) {
      return
    }
    stompClient = new Client({
      // brokerURL: 'wss://ws.cex.io/ws',
      brokerURL: 'ws://194.58.109.74/ws',
      connectHeaders: {
        Authorization: sessionService.authToken
      },
    //   webSocketFactory: function() {
    //     return new SockJS("http://194.58.109.74:8080/ws")
    // } ,
      debug: (str: any) => {
        console.log(str)
      }
    })
    // stompClient.connectHeaders = {
    //   Authorization: sessionService.authToken
    // },
    stompClient.onConnect = (frame: IFrame): void => {
      console.log(frame)
    }

    stompClient.onStompError = (frame: IFrame): void => {
      // Will be invoked in case of error encountered at Broker
      // Bad login/passcode typically will cause an error
      // Complaint brokers will set `message` header with a brief message. Body may contain details.
      // Compliant brokers will terminate the connection after any error
      console.log('Broker reported error: ' + frame.headers['message'])
      console.log('Additional details: ' + frame.body)
    }
    stompClient.activate()
    // stompClient.connect({
    //   Authorization: sessionService.authToken
    // }, onConnected, onError);
  };

  useEffect(() => {
    const chatId = searchParams.get('id')
    if (chatId) {
      getMessages(+chatId)
    }
  }, [])

  useEffect(() => {
    connect()
    return () => {
      stompClient?.deactivate()
    }
  }, [sessionService.authToken])

  useEffect(() => {
    lastMessageRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  return <Box className={styles.chat_container}>
    <ChatHeader></ChatHeader>
    <Box className={styles.chat_content}>
      {messages.map((m, i) => <ChatMessage key={i} message={m}></ChatMessage>)}
      <div ref={lastMessageRef}></div>
    </Box>
    <ChatFooter onMessageSend={sendMessage} ></ChatFooter>
  </Box>
})
