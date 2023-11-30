import { Box } from '@mui/material'
import { type OnboardingPage } from '../OnboardingContent/OnboardingContent'
import styles from './OnboardingChat.module.scss'
import { ReactComponent as ChatRight } from '../../../assets/onboarding/chat_right.svg'
import { ReactComponent as ChatLeft } from '../../../assets/onboarding/chat_left.svg'

interface Props {
  page: OnboardingPage
}
const OnboardingChat = ({ page }: Props): JSX.Element => {
  return (
    <Box className={styles.chat}>
      <Box className={styles.chat__message}>
        <Box className={styles.chat__message_text}>{page.messageOne}</Box>
        <Box className={styles.chat__ear} >
          <ChatRight />
        </Box>
        <Box><img src={page.avatarOne} alt='' className={styles.chat__avatar} /></Box>
      </Box>
      <Box className={`${styles.chat__message} ${styles.chat__message_left}`}>
        <Box className={`${styles.chat__message_text} ${styles.chat__message_text_left}`}>{page.messageTwo}</Box>
        <Box className={styles.chat__ear} >
          <ChatLeft />
        </Box>
        <Box><img src={page.avatarOne} alt='' className={styles.chat__avatar} /></Box>
      </Box>
    </Box>
  )
}
export default OnboardingChat
