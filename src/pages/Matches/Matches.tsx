import { useNavigate } from 'react-router-dom'
import styles from './Matches.module.scss'
import { type Message, type Chat } from 'models'
import { useCallback, useEffect, useState } from 'react'
import { chatService } from 'api-services'
import { mapChatToModel } from 'api/mapping-services/chat'
import { Box, Button, Typography } from '@mui/material'
import { useMainContext } from 'layouts/Main/MainLayout'
import { CardSkeleton, ChatCard } from 'components/ChatCart/ChatCard'
import { ChatMessageListener, chatMessagesQueue } from 'services/chat-messages'
import { t } from '@lingui/macro'

const Matches = (): JSX.Element => {
  const navigate = useNavigate()
  const [chats, setChats] = useState<Chat[]>([])
  const [chatsLoading, setChatsLoading] = useState(true)
  const { setMessage } = useMainContext()

  const callback = useCallback((message: Message): void => {
    const updatedChats = updateUnreadMessages(chats, message)
    setChats(updatedChats)
  }, [chats])

  const updateUnreadMessages = (chats: Chat[], message: Message): Chat[] => {
    return chats.map(c => ({
      ...c,
      unreadMessages: c.roomId === message.chatRoomId
        ? c.unreadMessages + 1
        : c.unreadMessages
    }))
  }

  const getAllChats = async (): Promise<void> => {
    try {
      const cts = (await chatService.getAllChats()).map(c => ({
        ...mapChatToModel(c),
        unreadMessages: chatMessagesQueue.queue.filter(m => m.chatRoomId === c.id).length
      }))
      setChats(cts)
      setTimeout(() => {
        setChatsLoading(false)
      }, 1000)
    } catch (error) {
      setMessage({
        text: error instanceof Error
          ? error.message
          : t`Something went wrong`,
        severity: 'error',
        life: 5000,
        visible: true
      })
      setTimeout(() => {
        setChatsLoading(false)
      }, 1000)
    }
  }

  const searchSomeone = (): void => {
    navigate('/search')
  }

  useEffect(() => {
    void getAllChats()
  }, [])

  useEffect(() => {
    chatMessagesQueue.subscribe(new ChatMessageListener(callback, 'ChatsPage'))
    return () => {
      chatMessagesQueue.unsubscribe('ChatsPage')
    }
  }, [chats])

  const goToChat = (roomId: number, email: string): void => {
    const emailEncoded = encodeURIComponent(email)
    navigate(`/chat?id=${roomId}&email=${emailEncoded}`)
  }

  return <>
    <Typography variant='h1'>{t`Your matches`}</Typography>
    <Box className={styles.matches_container}>
      {chatsLoading && <>
        <CardSkeleton></CardSkeleton>
        <CardSkeleton></CardSkeleton>
        <CardSkeleton></CardSkeleton>
        <CardSkeleton></CardSkeleton>
      </>}
      {!chatsLoading && chats.map((c, index) =>
        <ChatCard chat={c} onClick={() => { goToChat(c.roomId, c.recipient.email) }} key={c.roomId}/>
      )}
      {!chatsLoading && chats.length === 0 &&
        <Box className={styles.no_match}>
          <Typography>{t`You have no matches yet! Try to search someone`}</Typography>
          <Button variant="outlined" onClick={searchSomeone}>{t`Go to search`}</Button>
        </Box>
      }
    </Box>
  </>
}

export default Matches
