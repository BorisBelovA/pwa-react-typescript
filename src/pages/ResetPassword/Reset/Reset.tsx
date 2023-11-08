import { Box, Button, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom'
import styles from '../ResetPassword.module.scss'
import OtpInput from 'react-otp-input'
import { useEffect, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { minLength } from 'src/utils/validations'
import { useStore } from 'src/utils/StoreProvider'
import { useAuthContext } from 'src/layouts/Auth/AuthLayout'
import { userApiService } from 'api-services'
import { observer } from 'mobx-react-lite'
import { t } from '@lingui/macro'

interface ResetForm {
  email: string
  password: string
  confirmPassword: string
}

const Reset = (): JSX.Element => {
  const navigate = useNavigate()
  const { registrationStore } = useStore()
  const [otp, setOtp] = useState('')
  const [searchParams] = useSearchParams()
  const { register, handleSubmit, getValues, formState: { errors, isValid } } = useForm<ResetForm>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'all'
  })
  const {
    setBackdropMessage,
    setBackdropVisible,
    setMessage
  } = useAuthContext()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfPassword, setShowConfPassword] = useState(false)

  useEffect(() => {
    const email = searchParams.get('email')
    const token = searchParams.get('code')
    email && registrationStore.setCredentials(email, '')
    token && setOtp(token)
  }, [])

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
  }

  const onSubmit = async (data: ResetForm): Promise<void> => {
    setBackdropVisible(true)
    setBackdropMessage(t`Updating password`)

    try {
      await userApiService.resetPassword(registrationStore.email, data.password, otp)
      registrationStore.setCredentials(registrationStore.email, data.password)
      setBackdropVisible(false)
      navigate('/auth/reset-password/success')
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
        <Typography variant='h1'>{t`Reset password`}</Typography>
        <Typography>{t`for ${registrationStore.email}`}</Typography>
      </Box>

      <Box className={`${styles.form__input} ${styles.center}`}>
        <Typography>{t`Enter code from your email`}</Typography>
        <div dir='ltr'>
          <OtpInput
            value={otp}
            onChange={setOtp}
            placeholder='____'
            isInputNum={true}
            numInputs={4}
            inputStyle={styles.otp}
            containerStyle={styles.otp__container}
          />
        </div>
      </Box>

      <Box className={styles.form__input}>
        <TextField fullWidth label={t`Password`}
          type={showPassword ? 'text' : 'password'}
          error={!(errors.password == null)}
          variant="outlined"
          size="small"
          autoComplete='off'
          {...register('password', {
            required: t`Code is required`,
            minLength: minLength(8)
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => { setShowPassword((show) => !show) }}
                  onMouseDown={handleMouseDownPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          helperText={errors.password?.message ?? ''} />

        <TextField fullWidth label={t`Confirm password`}
          type={showConfPassword ? 'text' : 'password'}
          error={!(errors.confirmPassword == null)}
          autoComplete='off'
          variant="outlined"
          size="small"
          {...register('confirmPassword', {
            required: 'Required',
            minLength: minLength(8),
            validate: {
              samePassword: value => (value === getValues().password) || t`Passwords won't match`
            }
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => { setShowConfPassword((show) => !show) }}
                  onMouseDown={handleMouseDownPassword}>
                  {showConfPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          helperText={errors.confirmPassword?.message ?? ''} />

        <Button disabled={!isValid || otp.length !== 4}
          onClick={(e) => { void handleSubmit(onSubmit)(e) }}
          variant='contained'>
          {t`Reset password`}
        </Button>
        <Link component={RouterLink} to='/auth/login' className={styles.form__link}>{t`Back to login`}</Link>
      </Box>
    </Box>
  )
}
export default observer(Reset)
