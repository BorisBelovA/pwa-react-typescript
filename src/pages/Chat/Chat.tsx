import { Box, Typography } from '@mui/material'
import styles from './Chat.module.scss'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { type AuthUserWithEmail, type Message } from 'models'
import { ChatMessage, ChatMessageSkeleton } from './components/ChatMessage'
import { ChatHeader } from './components/ChatHeader'
import { ChatFooter } from './components/ChatFooter'
import { useSearchParams } from 'react-router-dom'
import { chatService, sessionService, stompChat, userApiService } from 'api-services'
import { useStore } from 'src/utils/StoreProvider'
import { observer } from 'mobx-react-lite'
import { mapFullUser, mapMessageToModel } from 'mapping-services'
import { type NewMessage } from 'dto'
import { ChatMessageListener, chatMessagesQueue } from 'src/services/chat-messages'

let storedMessages: Message[] = []

export const Chat = observer((): JSX.Element => {
  const [searchParams] = useSearchParams()
  const { userStore } = useStore()
  const lastMessageRef = useRef<HTMLDivElement | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [user, setUser] = useState<AuthUserWithEmail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const chatRoomId = useMemo(() => {
    const inChat = location.pathname.split('/')[1] === 'chat'
    return inChat
      ? +(location.search.split('&')[0].split('?id=')[1]) ?? null
      : null
  }, [location.pathname])

  const displayMessageInChat = useCallback((message: Message): void => {
    if (message.chatRoomId === chatRoomId) {
      storedMessages.push(message)
      setMessages([...storedMessages])
    }
  }, [chatRoomId])

  const [listener, setListener] = useState<ChatMessageListener | null>(null)

  const sendMessage = (text: string): void => {
    const chatId = searchParams.get('id')
    const message: NewMessage = {
      chatRoomId: +chatId!,
      senderId: userStore.id,
      recipientId: user!.id,
      content: text,
      timestamp: new Date().toISOString(),
      status: 'SENT'
    }

    stompChat.publishMessage(message)
    storedMessages.push(mapMessageToModel(message))
    setMessages([...storedMessages])
  }

  const getMessages = async (chatId: number): Promise<void> => {
    const messages = await chatService.getMessagesInChat(chatId)
    storedMessages = messages.reverse().map(m => mapMessageToModel(m))
    setMessages([...storedMessages])
    chatMessagesQueue.removeMessagesByChatRoom(chatId)
    setTimeout(() => {
      scrollToBottom('auto')
      setIsLoading(false)
    }, 1000)
  }

  const getUserInfo = async (email: string): Promise<void> => {
    if (sessionService.authToken) {
      const userDto = await userApiService.getUserByEmail(sessionService.authToken, email)
      const user = mapFullUser(userDto)
      setUser(user)
    }
  }

  useEffect(() => {
    const email = searchParams.get('email')
    if (chatRoomId) {
      void getMessages(chatRoomId)
    }
    if (email) {
      const emailEncoded = encodeURIComponent(email)
      void getUserInfo(emailEncoded)
    }
  }, [])

  useEffect(() => {
    const newListener = new ChatMessageListener(displayMessageInChat, 'ChatRoom')
    setListener(newListener)
    chatMessagesQueue.subscribe(newListener)
    return () => {
      if (listener) {
        chatMessagesQueue.unsubscribe(listener.type)
      }
    }
  }, [chatRoomId])

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
