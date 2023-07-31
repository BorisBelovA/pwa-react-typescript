import { Backdrop, Button, CircularProgress, Typography } from '@mui/material'
import { sessionService, userApiService } from 'api-services'
import { useState } from 'react'
import OtpInput from 'react-otp-input'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from 'src/layouts/Auth/AuthLayout'
import { useStore } from 'src/utils/StoreProvider'
import styles from './EmailCode.module.scss'

export const EmailCode = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  const { setMessage } = useAuthContext()
  const [otp, setOtp] = useState('')

  const { registrationStore } = useStore()

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

  return <>
    <Typography variant='h2'>Verify you email</Typography>
    <Typography variant='subtitle2'>paste the code you've recieved on your email</Typography>

    <OtpInput
      value={otp}
      onChange={setOtp}
      isInputNum={true}
      numInputs={4}
      separator={<span className={styles.separator}>-</span>}
      inputStyle={styles.test}
      containerStyle={styles.otp_container}
    />
    <Button fullWidth
      disabled={otp.length !== 4}
      variant='contained'
      onClick={(e) => { void verify(otp) }}
    >
      Verify
    </Button>

    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  </>
}
