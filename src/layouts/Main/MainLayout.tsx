import { Outlet, useOutletContext } from 'react-router-dom'
import NavBar from '../../components/navigation/NavBar/NavBar'
import styles from './MainLayout.module.scss'
import { useLoadingBackdrop, type LoadingBackdropOutletContext, LoadingBackdrop } from 'src/components/LoadingBackdrop/LoadingBackdrop'
import { useMessageAlert, type MessageAlertOutletContext, MessageAlert } from 'src/components/MessageAlert/MessageAlert'

export type MainLayoutContext = LoadingBackdropOutletContext & MessageAlertOutletContext

export const useMainContext = (): MainLayoutContext => {
  return useOutletContext<MainLayoutContext>()
}

const MainLayout: React.FunctionComponent = () => {
  const { message, setMessage } = useMessageAlert()
  const {
    backdropMessage,
    backdropVisible,
    setBackdropMessage,
    setBackdropVisible
  } = useLoadingBackdrop()

  return (
    <>
      <div className={styles.container}>
        <Outlet context={{
          setMessage,
          setBackdropMessage,
          setBackdropVisible
        }}/>
      </div>
      <NavBar />
      <MessageAlert message={message} setMessage={setMessage}></MessageAlert>
      <LoadingBackdrop backdropMessage={backdropMessage} backdropVisible={backdropVisible}></LoadingBackdrop>
    </>
  )
}

export default MainLayout
