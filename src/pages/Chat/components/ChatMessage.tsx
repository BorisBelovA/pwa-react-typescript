import { Box, useTheme } from '@mui/material'
import { getMessageTime } from 'src/utils/date-time'
import styles from './ChatMessage.module.scss'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { Message } from 'models'

export interface ChatMessageProp {
  message: Message
}

export const ChatMessage = ({ message }: ChatMessageProp): JSX.Element => {
  const theme = useTheme()
  return <Box className={`${styles.chat_message} ${message.mine ? styles.my_message : styles.roommate_message}`}>
    <DoneAllIcon fontSize='small' className={styles.chat_message_status}
      sx={{
        color: message.read
          ? theme.palette.primary.main
          : theme.palette.text.primary
      }}
    ></DoneAllIcon>
    {message.text}
    <Box className={styles.chat_message_time}>{getMessageTime(message.date)}</Box>
  </Box>
}