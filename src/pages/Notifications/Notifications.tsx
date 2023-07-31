import styles from '../../styles/utility.module.scss'
import { useStore } from '../../utils/StoreProvider'

const Notifications: React.FunctionComponent = () => {
  const store = useStore()
  return (
    <>
      <h2 className={styles.headerTemp}>Notifications</h2>
      <p className={styles.headerTemp}> Hello, {store.userStore.firstName} {store.userStore.lastName}</p>
      <p className={styles.headerTemp}>test update 1</p>
      <p className={styles.headerTemp}>test update 2</p>
      <p className={styles.headerTemp}>test update 3</p>
    </>
  )
}

export default Notifications
