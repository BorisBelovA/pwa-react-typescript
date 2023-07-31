import { Box, Typography } from '@mui/material'
import styles from './Chat.module.scss'
import { useEffect, useRef, useState } from 'react'
import { type AuthUser, type Message } from 'models'
import { ChatMessage, ChatMessageSkeleton } from './components/ChatMessage'
import { ChatHeader } from './components/ChatHeader'
import { ChatFooter } from './components/ChatFooter'
import { useSearchParams } from 'react-router-dom'
import { chatService, sessionService, userApiService } from 'api-services'
import { Client, type IFrame, type IMessage } from '@stomp/stompjs'
import { useStore } from 'src/utils/StoreProvider'
import { observer } from 'mobx-react-lite'
import { mapAuthenticatedUserData, mapMessageToModel } from 'mapping-services'
import { type NewMessage, type Message as dtoMessage } from 'dto'

const stompClient: Client = new Client({
  brokerURL: 'wss://app.roommate.host/wss',
  // connectHeaders: {
  //   Authorization: sessionService.authToken
  // },
  debug: (str: any) => {
    console.log(str)
  },
  onStompError: (frame: IFrame): void => {
    console.log('Broker reported error: ' + frame.headers['message'])
    console.log('Additional details: ' + frame.body)
  }
})

var storedMessages: Message[] = []

export const Chat = observer((): JSX.Element => {
  const [searchParams] = useSearchParams()
  const { userStore } = useStore()
  const lastMessageRef = useRef<HTMLDivElement | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const sendMessage = (text: string): void => {
    const chatId = searchParams.get('id')
    const m: NewMessage = {
      chatRoomId: +chatId!,
      senderId: userStore.id,
      recipientId: user!.id,
      content: text,
      timestamp: new Date().toISOString(),
      status: 'SENT'
    }

    stompClient?.publish({
      destination: '/app/chat',
      body: JSON.stringify(m)
    })
    storedMessages.push(mapMessageToModel(m))
    setMessages([...storedMessages])
  }

  const getMessages = async (chatId: number): Promise<void> => {
    const messages = await chatService.getMessagesInChat(chatId)
    storedMessages = messages.reverse().map(m => mapMessageToModel(m))
    setMessages([...storedMessages])
    scrollToBottom('auto')
    setIsLoading(false)
  }

  const getUserInfo = async (email: string): Promise<void> => {
    if (sessionService.authToken) {
      const userDto = await userApiService.getUserByEmail(sessionService.authToken, email)
      const [user] = mapAuthenticatedUserData(userDto)
      setUser(user)
    }
  }

  const onMessageReceive = (message: IMessage): void => {
    const body: dtoMessage = JSON.parse(message.body)
    storedMessages.push(mapMessageToModel(body))
    setMessages([...storedMessages])
  }

  useEffect(() => {
    const chatId = searchParams.get('id')
    const email = searchParams.get('email')
    if (chatId) {
      void getMessages(+chatId)
    }
    if (email) {
      void getUserInfo(email)
    }
  }, [])

  useEffect(() => {
    if (sessionService.authToken && userStore.id && stompClient) {
      stompClient.activate()
      stompClient.onConnect = function () {
        stompClient.subscribe(
          `/user/${userStore.id}/queue/messages`,
          onMessageReceive
        )
      }
    }
    return () => {
      void stompClient.deactivate()
    }
  }, [sessionService.authToken, userStore.id])

  const scrollToBottom = (behavior: ScrollBehavior): void => {
    lastMessageRef?.current?.scrollIntoView({ behavior })
  }

  useEffect(() => {
    scrollToBottom('smooth')
  }, [messages.length])

  return <Box className={styles.chat_container}>
    <ChatHeader user={user}></ChatHeader>
    <Box className={styles.chat_content}>
      {isLoading && <>
        <ChatMessageSkeleton mine={true}></ChatMessageSkeleton>
        <ChatMessageSkeleton mine={false}></ChatMessageSkeleton>
        <ChatMessageSkeleton mine={true}></ChatMessageSkeleton>
        <ChatMessageSkeleton mine={false}></ChatMessageSkeleton>
      </>}
      {!isLoading && messages.map((m, i) => <ChatMessage key={i} mine={m.senderId === userStore.id} message={m}></ChatMessage>)}
      {!isLoading && messages.length === 0 &&
        <Box className={styles.no_messages}>
          <Typography>No messages yet.</Typography>
          <Typography>Type something to start conversation with {user?.firstName ?? ''}</Typography>
        </Box>
      }
      <div ref={lastMessageRef}></div>
    </Box>
    <ChatFooter onMessageSend={sendMessage} ></ChatFooter>
  </Box>
})
