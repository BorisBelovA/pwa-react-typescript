import { Box, TextField, IconButton, useTheme } from '@mui/material'
import styles from './ChatFooter.module.scss'
import { useState } from 'react'
import SendIcon from '@mui/icons-material/Send'

interface ChatFooterProps {
  onMessageSend: (message: string) => void
}

export const ChatFooter = ({ onMessageSend }: ChatFooterProps): JSX.Element => {
  const theme = useTheme()
  const [typedMessage, setTypedMessage] = useState<string>('')

  const sendMessage = (): void => {
    onMessageSend(typedMessage)
    setTypedMessage('')
  }

  return <Box className={styles.chat_footer}>
    <TextField fullWidth size='small' placeholder='Message' variant='outlined'
      value={typedMessage}
      onKeyDown={(event) => {
        if (event.key.toLowerCase() === 'enter') {
          sendMessage()
        }
      }}
      onChange={(event) => {
        setTypedMessage(((event.nativeEvent as InputEvent).target as HTMLInputElement).value)
      }}
    />
    <IconButton aria-label='delete' size='small'
      onClick={() => (sendMessage())}
      disabled={typedMessage.length === 0}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.paper,
        ':hover': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.background.paper
        }
      }}
    >
      <SendIcon />
    </IconButton>
  </Box>
}