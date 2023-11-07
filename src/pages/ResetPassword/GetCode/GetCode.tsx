import { Box, Button, Link, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { emailPatternValidator } from 'src/utils/validations'
import styles from '../ResetPassword.module.scss'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from 'src/layouts/Auth/AuthLayout'
import { useStore } from 'src/utils/StoreProvider'
import { userApiService } from 'api-services'
import { t } from '@lingui/macro'

interface GetCodeForm {
  email: string
}

const GetCode = (): JSX.Element => {
  const navigate = useNavigate()
  const { registrationStore } = useStore()
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<GetCodeForm>({
    defaultValues: {
      email: ''
    },
    mode: 'all'
  })
  const {
    setBackdropMessage,
    setBackdropVisible,
    setMessage
  } = useAuthContext()

  const onSubmit = async (data: GetCodeForm): Promise<void> => {
    if (!data.email) {
      throw new Error(t`No email provided!`)
    }
    setBackdropVisible(true)
    setBackdropMessage(t`Sending code`)

    try {
      const email = data.email.toLowerCase()
      await userApiService.sendCode(email)
      registrationStore.setCredentials(email, '')
      setBackdropVisible(false)
      navigate('/auth/reset-password/reset')
    } catch (e) {
      setMessage({
        visible: true,
        severity: 'error',
        text: e instanceof Error
          ? e.message
          : t`Something went wrong`
      })
      setBackdropVisible(false)
    }
  }

  return (
    <Box className={styles.form}>
      <Box className={styles.form__head}>
        <Typography variant='h1'>{t`Forgot password`}</Typography>
        <Typography>{t`Please enter your email and we will send you a code to reset your password`}</Typography>
      </Box>
      <Box className={styles.form__input}>
        <TextField fullWidth label={t`E-mail`}
          type='email'
          error={!(errors.email == null)}
          variant="outlined"
          size="small"
          autoComplete='off'
          {...register('email', { pattern: emailPatternValidator, required: t`Email is required` })}
          helperText={errors.email?.message ?? ''} />
        <Button disabled={!isValid}
          onClick={(e) => { void handleSubmit(onSubmit)(e) }}
          variant="contained"
        >
          {t`Get code`}
        </Button>
        <Link component={RouterLink} to='/auth/login' className={styles.form__link}>{t`Back to login`}</Link>
      </Box>
    </Box>
  )
}
export default GetCode
