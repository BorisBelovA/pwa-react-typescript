import { Outlet, useOutletContext } from 'react-router-dom'
import {
  LoadingBackdrop,
  type LoadingBackdropOutletContext,
  useLoadingBackdrop
} from 'components/LoadingBackdrop/LoadingBackdrop'
import { MessageAlert, useMessageAlert, type MessageAlertOutletContext } from 'components/MessageAlert/MessageAlert'
import styles from './AuthLayout.module.scss'

export type AuthContext = LoadingBackdropOutletContext & MessageAlertOutletContext

export const useAuthContext = (): AuthContext => {
  return useOutletContext<AuthContext>()
}

export const AuthLayout = (): JSX.Element => {
  const { message, setMessage } = useMessageAlert()
  const {
    backdropMessage,
    backdropVisible,
    setBackdropMessage,
    setBackdropVisible
  } = useLoadingBackdrop()

  return <div className={styles.container}>
    <Outlet context={{
      setMessage,
      setBackdropMessage,
      setBackdropVisible
    }} />
    <MessageAlert message={message} setMessage={setMessage}></MessageAlert>
    <LoadingBackdrop backdropMessage={backdropMessage} backdropVisible={backdropVisible}></LoadingBackdrop>
  </div>
}
