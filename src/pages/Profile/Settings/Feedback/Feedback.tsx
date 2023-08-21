import { Box, Button, TextField, Typography } from '@mui/material'
import profileStyles from '../../Profile.module.scss'
import BackButton from 'src/components/Buttons/BackButton/BackButton'
import styles from './Feedback.module.scss'
import { feedbackService } from 'api-services'
import { observer } from 'mobx-react-lite'
import { useStore } from 'src/utils/StoreProvider'
import { useState } from 'react'
import { useMainContext } from 'src/layouts/Main/MainLayout'

export const Feedbcak = observer((): JSX.Element => {
  const { registrationStore } = useStore()
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const { setBackdropMessage, setBackdropVisible, setMessage } = useMainContext()
  const sendFeedback = async (): Promise<void> => {
    setBackdropVisible(true)
    setBackdropMessage('Sending your request!')
    try {
      await feedbackService.sendFeedback(
        registrationStore.email,
        feedbackMessage
      )
      setBackdropVisible(false)
      setMessage({
        text: 'Thank you for your feedback!',
        life: 5000,
        severity: 'success',
        visible: true
      })
      setFeedbackMessage('')
    } catch (e) {
      setBackdropVisible(false)
      setMessage({
        text: e instanceof Error
          ? e.message
          : 'Something went wrong',
        life: 5000,
        severity: 'error',
        visible: true
      })
    }
  }

  return <Box className={profileStyles.profile__container}>
    <Box className={`${profileStyles.profile__header} ${profileStyles.mb1}`}>
      <BackButton />
      <Typography variant='h1'>Feedback form</Typography>
    </Box>
    <Box className={styles.feedback_container}>
      <Typography variant='body1'>Please describe your issue or suggestion.</Typography>
      <Typography variant='body1'>Or contact us via email: </Typography>

      <TextField
        label="Your feedback"
        multiline
        fullWidth
        minRows={4}
        onChange={(event) => {
          setFeedbackMessage(event.target.value)
        }}
      />

      <Button variant="contained"
        fullWidth
        disabled={feedbackMessage.length === 0}
        onClick={() => { void sendFeedback() }}>
        Send feedback
      </Button>
    </Box>
  </Box>
})
