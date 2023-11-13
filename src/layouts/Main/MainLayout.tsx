import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import NavBar from '../../components/navigation/NavBar/NavBar'
import styles from './MainLayout.module.scss'
import { useLoadingBackdrop, type LoadingBackdropOutletContext, LoadingBackdrop } from 'src/components/LoadingBackdrop/LoadingBackdrop'
import { useMessageAlert, type MessageAlertOutletContext, MessageAlert } from 'src/components/MessageAlert/MessageAlert'
import { sessionService, stompChat } from 'api-services'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useStore } from 'src/utils/StoreProvider'
import { observer } from 'mobx-react-lite'
import { type IFrame } from '@stomp/stompjs'
import { ChatMessageListener, chatMessagesQueue } from 'src/services/chat-messages'
import { mapMessageToModel } from 'mapping-services'
import { type Message } from 'models'
import { Snackbar } from '@mui/material'
import { t } from '@lingui/macro'

export type MainLayoutContext = LoadingBackdropOutletContext & MessageAlertOutletContext

export const useMainContext = (): MainLayoutContext => {
  return useOutletContext<MainLayoutContext>()
}

const MainLayout = observer((): JSX.Element => {
  const { message, setMessage } = useMessageAlert()
  const {
    backdropMessage,
    backdropVisible,
    setBackdropMessage,
    setBackdropVisible
  } = useLoadingBackdrop()
  const { userStore } = useStore()

  const chatService = stompChat
  const location = useLocation()
  const chatRoomId = useMemo(() => {
    const inChat = location.pathname.split('/')[1] === 'chat'
    return inChat
      ? +(location.search.split('&')[0].split('?id=')[1]) ?? null
      : null
  }, [location.pathname])

  const displayNotification = useCallback((message: Message) => {
    if (message.chatRoomId !== chatRoomId) {
      setMessageVisible(true)
    }
  }, [chatRoomId])

  const [listener, setListener] = useState<ChatMessageListener | null>(null)

  const [messageVisible, setMessageVisible] = useState<boolean>(false)

  useEffect(() => {
    const newListener = new ChatMessageListener(displayNotification)
    if (listener) {
      chatMessagesQueue.unsubscribe(listener.type)
    }
    setListener(newListener)
    chatMessagesQueue.subscribe(newListener)
  }, [chatRoomId])

  useEffect(() => {
    if (sessionService.authToken && userStore.id && chatService) {
      chatService.connect(
        userStore.id,
        (message: IFrame) => {
          const body = JSON.parse(message.body)
          chatMessagesQueue.addMessageToQueue({
            ...mapMessageToModel(body)
          })
        }
      )
    }

    if (listener) {
      chatMessagesQueue.subscribe(listener)
    }

    return () => {
      chatMessagesQueue.unsubscribe('Global')
      chatMessagesQueue.unsubscribe('ChatRoom')
      chatService.disconnect()
    }
  }, [])

  return (
    <>
      <div className={styles.container}>
        <Outlet context={{
          setMessage,
          setBackdropMessage,
          setBackdropVisible
        }} />
      </div>
      <NavBar />
      <MessageAlert message={message} setMessage={setMessage}></MessageAlert>
      <LoadingBackdrop backdropMessage={backdropMessage} backdropVisible={backdropVisible}></LoadingBackdrop>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={messageVisible}
        onClose={() => { setMessageVisible(false) }}
        message={t`You've received a new message`}
        autoHideDuration={5000}
        key={'top-center'}
      />
    </>
  )
})

export default MainLayout
