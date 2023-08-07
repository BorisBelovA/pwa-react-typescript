import { Box, Button, Link, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { emailPatternValidator } from 'src/utils/validations'
import styles from '../ResetPassword.module.scss'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuthContext } from 'src/layouts/Auth/AuthLayout'
import { useStore } from 'src/utils/StoreProvider'
import { userApiService } from 'api-services'

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
      throw new Error('No email provided!')
    }
    setBackdropVisible(true)
    setBackdropMessage('Sending code')

    try {
      const email = data.email.toLowerCase()
      const respone = await userApiService.sendCode(email)
      registrationStore.setCredentials(email, '')
      setBackdropVisible(false)
      navigate('/auth/reset-password/reset')
    } catch (e) {
      setMessage({
        visible: true,
        severity: 'error',
        text: e instanceof Error
          ? e.message
          : 'Something went wtong'
      })
      setBackdropVisible(false)
    }
  }

  return (
    <Box className={styles.form}>
      <Box className={styles.form__head}>
        <Typography variant='h1'>Forgot password</Typography>
        <Typography>Please enter your email and we&nbsp;will send you a&nbsp;code to&nbsp;reset your password</Typography>
      </Box>
      <Box className={styles.form__input}>
        <TextField fullWidth label="E-mail"
          type='email'
          error={!(errors.email == null)}
          variant="outlined"
          size="small"
          autoComplete='off'
          {...register('email', { pattern: emailPatternValidator, required: 'Email is required' })}
          helperText={errors.email?.message ?? ''} />
        <Button disabled={!isValid}
          onClick={(e) => { void handleSubmit(onSubmit)(e) }}
          variant="contained"
        >
          Get code
        </Button>
        <Link component={RouterLink} to='/auth/login' className={styles.form__link}>Back to login</Link>
      </Box>
    </Box>
  )
}
export default GetCode
