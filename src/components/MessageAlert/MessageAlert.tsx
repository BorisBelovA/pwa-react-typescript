import { Grow, Alert, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

export interface Message {
  visible: boolean
  severity: 'error' | 'info' | 'success' | 'warning'
  text: string
  life?: number
}

interface MessageAlertProps {
  message: Message | null
  setMessage: (message: Message | null) => void
}

export interface MessageAlertOutletContext {
  message: Message | null
  setMessage: (message: Message | null) => void
}

export const useMessageAlert = (): MessageAlertOutletContext => {
  const [message, setMessage] = useState<Message | null>(null)
  return { message, setMessage } as const
}

export const MessageAlert = ({ message, setMessage }: MessageAlertProps): JSX.Element => {
  useEffect(() => {
    if (message !== null) {
      setTimeout(() => {
        setMessage(null)
      }, message.life ?? 2000)
    }
  }, [message])

  return <>
    {message !== null &&
      <Grow in={message?.visible}>
        <Alert sx={{
          position: 'absolute',
          zIndex: 9999,
          bottom: 0,
          width: '100%'
        }} severity={message?.severity}>
          <Typography variant='body1'>{message?.text}</Typography>
        </Alert>
      </Grow>
    }
  </>
}
