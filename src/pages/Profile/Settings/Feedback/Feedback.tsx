import { Box, Button, TextField, Typography } from '@mui/material'
import profileStyles from '../../Profile.module.scss'
import BackButton from 'components/Buttons/BackButton/BackButton'
import styles from './Feedback.module.scss'
import { feedbackService } from 'api-services'
import { observer } from 'mobx-react-lite'
import { useStore } from 'utils/StoreProvider'
import { useState } from 'react'
import { useMainContext } from 'layouts/Main/MainLayout'
import { DonateDialog } from 'components/DonateDialog/DonateDialog'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'

export const Feedback = observer((): JSX.Element => {
  const { registrationStore } = useStore()
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const { setBackdropMessage, setBackdropVisible, setMessage } = useMainContext()
  const [donateVisible, setDonateVisible] = useState(false)

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

      <TextField
        label="Your feedback"
        multiline
        fullWidth
        minRows={4}
        onChange={(event) => {
          setFeedbackMessage(event.target.value)
        }}
      />

      <Button variant="outlined"
        fullWidth
        disabled={feedbackMessage.length === 0}
        onClick={() => { void sendFeedback() }}>
        Send feedback
      </Button>

      <Button variant='contained'
        fullWidth
        startIcon={<MonetizationOnOutlinedIcon/>}
        onClick={() => { setDonateVisible(true) }}>
        Donate
      </Button>
    </Box>

    <DonateDialog visible={donateVisible} setVisible={setDonateVisible} />
  </Box>
})
