import { Box, Button, IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { useForm, type ValidationRule } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { userApiService, sessionService } from 'api-services'
import { useAuthContext } from 'src/layouts/Auth/AuthLayout'
import { emailPatternValidator } from 'src/utils/validations'
import { mapAuthenticatedUserData } from 'mapping-services'
import { useStore } from 'src/utils/StoreProvider'
import { ErrorCodes } from 'src/models/errors'
import { t } from '@lingui/macro'

interface SignUpForm {
  email: string
  password: string
}

const minLength = (length: number): ValidationRule<number> => ({
  value: length,
  message: `Min length ${length} symbols`
})

export const Login = (): JSX.Element => {
  const navigate = useNavigate()
  const { setMessage, setBackdropMessage, setBackdropVisible } = useAuthContext()
  const { registrationStore, userStore } = useStore()
  const theme = useTheme()
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<SignUpForm>({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'all'
  })

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = (): void => { setShowPassword((show) => !show) }
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
  }

  const onSubmit = async (data: SignUpForm): Promise<void> => {
    setBackdropVisible(true)
    setBackdropMessage(t`Login to your account`)
    try {
      const token = await userApiService.login(data.email, data.password)
      sessionService.authToken = token
      const userInfo = await userApiService.getAuthenticatedUser(token)
      const [user] = mapAuthenticatedUserData(userInfo)
      userStore.setUser(user)
      setTimeout(() => {
        setBackdropVisible(false)
        registrationStore.setCredentials(data.email, data.password)
        if (userStore.firstName !== '' && userStore.lastName !== '') {
          navigate('/profile')
        } else {
          navigate('/auth/terms')
        }
      }, 1500)
    } catch (e) {
      console.error(e)
      let text = t`Something went wrong😮`
      if (e instanceof Error) {
        text = e.message
        if (e.cause === ErrorCodes.EMAIL_NOT_ACTIVATED) {
          registrationStore.setCredentials(data.email, data.password)
          navigate('/auth/email-verification')
        }
      }
      setMessage({
        visible: true,
        severity: 'error',
        text
      })
      setBackdropVisible(false)
    }
  }

  return <>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '.5rem', alignItems: 'center' }}>
      <Typography variant='h1'>{t`Log in`}</Typography>
      <Typography>{t`New to roommate.host?`} <Link to='/auth/signup'>
        <Typography component='span' sx={{ color: theme.palette.primary.main }}>{t`Sign up`}</Typography></Link></Typography>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem', width: '100%', alignItems: 'center' }}>
      <TextField fullWidth label={t`E-mail`}
        type='email'
        error={!(errors.email == null)}
        variant="outlined"
        size="small"
        autoComplete='off'
        {...register('email', { pattern: emailPatternValidator, required: t`Email is required` })}
        helperText={errors.email?.message ?? ''} />

      <TextField fullWidth label={t`Password`}
        type={showPassword ? 'text' : 'password'}
        error={!(errors.password == null)}
        variant="outlined"
        autoComplete='off'
        size="small"
        {...register('password', { required: t`Password is required`, minLength: minLength(8) })}
        helperText={errors.password?.message ?? ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <Button disabled={!isValid}
        onClick={(e) => { void handleSubmit(onSubmit)(e) }}
        variant="contained"
        sx={{ width: '100%' }}
      >
        {t`Log in`}
      </Button>
    </Box>
    <Box sx={{ width: '100%', textAlign: 'right' }}>
      <Link to='/auth/reset-password/get-code'>
        <Typography component='span' sx={{ color: theme.palette.primary.main }}>{t`Forgot password?`}</Typography>
      </Link>
    </Box>
  </>
}
