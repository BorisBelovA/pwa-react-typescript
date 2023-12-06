import { Box, Button, TextField, Typography } from '@mui/material'
import profileStyles from '../../Profile.module.scss'
import BackButton from 'components/Buttons/BackButton/BackButton'
import styles from './Feedback.module.scss'
import { feedbackService } from 'api-services'
import { observer } from 'mobx-react-lite'
import { useStore } from 'utils/StoreProvider'
import { useEffect, useState } from 'react'
import { useMainContext } from 'layouts/Main/MainLayout'
import { DonateDialog } from 'components/DonateDialog/DonateDialog'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import { t } from '@lingui/macro'
import { Steps } from 'intro.js-react'
import { defaultStepsOptions, stepsFactory } from 'assets/data/intro-steps/steps'
import { tooltips } from 'assets/data/intro-steps/feedback'

export const Feedback = observer((): JSX.Element => {
  const { registrationStore, walkthroughStore, themeStore } = useStore()
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const { setBackdropMessage, setBackdropVisible, setMessage } = useMainContext()
  const [donateVisible, setDonateVisible] = useState(false)
  const introSteps = stepsFactory(
    tooltips,
    themeStore.theme
  )

  const [stepsVisible, setStepsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setStepsVisible(true)
    }, 100)
  }, [])

  const sendFeedback = async (): Promise<void> => {
    setBackdropVisible(true)
    setBackdropMessage(t`Sending your request!`)
    try {
      await feedbackService.sendFeedback(
        registrationStore.email,
        feedbackMessage
      )
      setBackdropVisible(false)
      setMessage({
        text: t`Thank you for your feedback!`,
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
          : t`Something went wrong`,
        life: 5000,
        severity: 'error',
        visible: true
      })
    }
  }

  return <Box className={profileStyles.profile__container}>
    <Box className={`${profileStyles.profile__header} ${profileStyles.mb1}`}>
      <BackButton />
      <Typography variant='h1'>{t`Feedback form`}</Typography>
    </Box>
    <Box className={styles.feedback_container}>
      <Typography variant='body1'>
          {t`Please describe your issue or suggestion.`}
      </Typography>

      <TextField data-intro-id="feedback-input-field"
        label={t`Your feedback`}
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
        {t`Send feedback`}
      </Button>

      <Button data-intro-id='feedback-donate-btn'
        variant='contained'
        fullWidth
        onClick={() => { setDonateVisible(true) }}>
        {t`Donate`} <MonetizationOnOutlinedIcon />
      </Button>
    </Box>

    <DonateDialog visible={donateVisible} setVisible={setDonateVisible} />

    <Steps
      enabled={stepsVisible && walkthroughStore.walkthroughVisible}
      steps={introSteps}
      initialStep={0}
      options={{
        ...defaultStepsOptions,
        doneLabel: 'Let\s go'
      }}
      onComplete={() => {
        walkthroughStore.finishWalkthrough()
      }}
      onExit={(stepIndex) => {
        if (stepIndex !== introSteps.length && stepIndex !== -1) {
          walkthroughStore.finishWalkthrough()
        }
      }}
    />
  </Box>
})
