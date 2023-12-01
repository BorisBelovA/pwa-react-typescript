import { Box } from '@mui/material'
import { type OnboardingPage } from '../OnboardingContent/OnboardingContent'
import styles from './OnboardingChat.module.scss'
import { ReactComponent as ChatRight } from '../../../assets/onboarding/chat_right.svg'
import { ReactComponent as ChatLeft } from '../../../assets/onboarding/chat_left.svg'
import { useLingui } from '@lingui/react'

interface Props {
  page: OnboardingPage
}
const OnboardingChat = ({ page }: Props): JSX.Element => {
  const { i18n } = useLingui()
  return (
    <Box className={styles.chat}>
      <Box className={styles.chat__message}>
        <Box className={styles.chat__message_text}>{i18n._(page.messageOne)}</Box>
        <Box className={styles.chat__ear} >
          <ChatRight />
        </Box>
        <Box className={styles.chat__avatar}><img src={page.avatarOne} alt='' className={styles.chat__avatar} /></Box>
      </Box>
      <Box className={`${styles.chat__message} ${styles.chat__message_left}`}>
        <Box className={`${styles.chat__message_text} ${styles.chat__message_text_left}`}>{i18n._(page.messageTwo)}</Box>
        <Box className={styles.chat__ear} >
          <ChatLeft />
        </Box>
        <Box className={styles.chat__avatar}><img src={page.avatarTwo} alt='' className={styles.chat__avatar} /></Box>
      </Box>
    </Box>
  )
}
export default OnboardingChat
