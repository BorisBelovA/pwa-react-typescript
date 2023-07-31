import { Box, Skeleton, useTheme } from '@mui/material'
import { getMessageTime } from 'src/utils/date-time'
import styles from './ChatMessage.module.scss'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { type Message } from 'models'
import { useStore } from 'src/utils/StoreProvider'

export interface ChatMessageProp {
  mine: boolean
  message: Message
}

export const ChatMessage = ({ message, mine }: ChatMessageProp): JSX.Element => {
  const theme = useTheme()
  const { themeStore } = useStore()

  return <Box className={`${styles.chat_message} ${mine ? styles.my_message : styles.roommate_message}`}
    sx={{
      backgroundColor: themeStore.theme === 'light'
      // Надо подумать куда добавить этот цвет
        ? mine
          ? 'lightgreen'
          : theme.palette.grey[300]
        : mine
          ? theme.palette.primary.dark
          : theme.palette.background.paper
    }}
  >
    <DoneAllIcon fontSize='small' className={styles.chat_message_status}
      sx={{
        color: message.status === 'DELIVERED'
          ? theme.palette.primary.main
          : theme.palette.text.primary
      }}
    ></DoneAllIcon>
    {message.content}
    <Box className={styles.chat_message_time}>{getMessageTime(message.timestamp)}</Box>
  </Box>
}

export const ChatMessageSkeleton = ({ mine }: Partial<ChatMessageProp>): JSX.Element => {
  const theme = useTheme()
  const { themeStore } = useStore()

  return <Box className={`${styles.chat_message} ${mine ? styles.my_message : styles.roommate_message}`}
    sx={{
      backgroundColor: themeStore.theme === 'light'
      // Надо подумать куда добавить этот цвет
        ? mine
          ? 'lightgreen'
          : theme.palette.grey[300]
        : mine
          ? theme.palette.primary.dark
          : theme.palette.background.paper
    }}
  >
    <DoneAllIcon fontSize='small' className={styles.chat_message_status}></DoneAllIcon>
    <Skeleton width={100}></Skeleton>
    <Box className={styles.chat_message_time}>
      <Skeleton width={30}></Skeleton>
    </Box>
  </Box>
}