import { Backdrop, Button, CircularProgress, Typography } from '@mui/material'
import { sessionService, userApiService } from 'api-services'
import { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from 'layouts/Auth/AuthLayout'
import { useStore } from 'utils/StoreProvider'
import styles from './EmailCode.module.scss'
import { observer } from 'mobx-react-lite'

const sendAgainDebounce = 30

export const EmailCode = observer((): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  const { setMessage } = useAuthContext()
  const [otp, setOtp] = useState('')
  const { registrationStore } = useStore()
  const [timeLeft, setTimeLeft] = useState<number>(sendAgainDebounce)

  const navigate = useNavigate()

  const verify = (code: string): void => {
    if (code.length === 0) {
      throw new Error('Code length is 0!!')
    }
    setLoading(true)
    userApiService.activateUser(code, registrationStore.email)
      .then(async () => {
        const token = await userApiService.login(registrationStore.email, registrationStore.password)
        sessionService.authToken = token
        navigate('/auth/terms')
      })
      .catch(error => {
        console.log(error)
        setMessage({
          text: 'Something went wrong 😨',
          visible: true,
          severity: 'error'
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [timeLeft])

  const sendAgain = async (): Promise<void> => {
    setTimeLeft(sendAgainDebounce)
    try {
      await userApiService.resetEmailToken(registrationStore.email)
    } catch (e) {
      setTimeLeft(0)
      setMessage({
        text: e instanceof Error
          ? e.message
          : 'Unable to send email again',
        severity: 'error',
        life: 5000,
        visible: true
      })
    }
  }

  return <>
    <Typography variant='h2'>Verify you email</Typography>

    <OtpInput
      value={otp}
      onChange={setOtp}
      isInputNum={true}
      numInputs={4}
      separator={<span className={styles.separator}>-</span>}
      inputStyle={styles.otp}
      containerStyle={styles.otp_container}
    />

    <Typography variant='subtitle2'>A verification code has been sent to you</Typography>

    {timeLeft > 0 && <Typography variant='body1'>You can send new one in {timeLeft} seconds</Typography>}
    {timeLeft === 0 && <Button onClick={ () => { void sendAgain() }}>Send again</Button>}

    <Button fullWidth
      disabled={otp.length !== 4}
      variant='contained'
      sx={{ marginTop: '1rem' }}
      onClick={() => { verify(otp) }}>
      Verify
    </Button>

    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  </>
})
