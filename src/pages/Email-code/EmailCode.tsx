import { Backdrop, Button, CircularProgress, Typography } from '@mui/material'
import { sessionService, userApiService } from 'api-services'
import { useState } from 'react'
import OtpInput from 'react-otp-input'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from 'src/layouts/Auth/AuthLayout'
import { useStore } from 'src/utils/StoreProvider'
import styles from './EmailCode.module.scss'
import { filesApiService } from 'src/api/api-services/files'
import { mapBase64ToFile, mapUserToDto } from 'mapping-services'

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
    userApiService.activateUser(code)
      .then(async () => {
        const token = await userApiService.login(registrationStore.email, registrationStore.password)
        sessionService.authToken = token
        // let avatarName: string | null = null
        // let photoName: string | null = null
        // if (userStore.avatar !== null) {
        //   const file = await mapBase64ToFile(userStore.avatar, `${new Date().toISOString()}`)
        //   avatarName = await filesApiService.uploadFile(file, 'avatar')
        // }
        // if (userStore.photo !== null) {
        //   const file = await mapBase64ToFile(userStore.photo, `${new Date().toISOString()}`)
        //   photoName = await filesApiService.uploadFile(file, 'photo')
        // }
        // await userApiService.updateUser(
        //   mapUserToDto({
        //     ...userStore.user,
        //     avatar: avatarName,
        //     photo: photoName
        //   }),
        //   sessionService.authToken
        // )
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
      numInputs={6}
      separator={<span className={styles.separator}>-</span>}
      inputStyle={styles.test}
      containerStyle={styles.otp_container}
    />
    <Button fullWidth
      disabled={otp.length !== 6}
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
