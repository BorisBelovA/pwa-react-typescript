import { Box, Button, Typography } from '@mui/material'
import styles from '../ResetPassword.module.scss'
import { ReactComponent as SuccessSVG } from '../../../assets/icons/success.svg'
import { sessionService, userApiService } from 'api-services'
import { useStore } from 'src/utils/StoreProvider'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from 'src/layouts/Auth/AuthLayout'
import { mapAuthenticatedUserData } from 'mapping-services'
import { t } from '@lingui/macro'

const Success = (): JSX.Element => {
  const navigate = useNavigate()
  const { registrationStore, userStore } = useStore()
  const {
    setBackdropMessage,
    setBackdropVisible,
    setMessage
  } = useAuthContext()

  const handleSubmit = async (): Promise<void> => {
    setBackdropVisible(true)
    setBackdropMessage(t`Logging in`)
    try {
      const token = await userApiService.login(registrationStore.email, registrationStore.password)
      sessionService.authToken = token
      const userInfo = await userApiService.getAuthenticatedUser(token)
      const [user] = mapAuthenticatedUserData(userInfo)
      userStore.setUser(user)
      navigate('/profile')
    } catch (error) {
      setMessage({
        visible: true,
        severity: 'error',
        text: error instanceof Error
          ? error.message
          : t`Something went wrong`
      })
      setBackdropVisible(false)
      navigate('/auth/login')
    }
  }

  return (
    <Box className={`${styles.form} ${styles.center}`}>
      <SuccessSVG />
      <Box className={`${styles.form__head} ${styles.center}`}>
        <Typography variant='h1'>{t`Success!`}</Typography>
        <Typography>{t`Now you can log in with your new password`}</Typography>
      </Box>
      <Box className={`${styles.form__input}`}>
        <Button
          onClick={() => { void handleSubmit() }}
          variant="contained"
        >
          {t`Log in`}
        </Button>
      </Box>
    </Box>
  )
}
export default Success
