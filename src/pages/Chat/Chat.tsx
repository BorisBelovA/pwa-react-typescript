import { Box } from '@mui/material'
import styles from './Chat.module.scss'
import { useEffect, useMemo, useRef, useState } from 'react'
import { type Message } from 'models'
import { ChatMessage } from './components/ChatMessage'
import { ChatHeader } from './components/ChatHeader'
import { ChatFooter } from './components/ChatFooter'

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

export const Chat = (): JSX.Element => {
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
}
