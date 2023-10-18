import { Button, IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Signup.module.scss'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { minLength } from 'src/utils/validations'
import { useStore } from 'src/utils/StoreProvider'
import { userApiService } from 'api-services'
import { useAuthContext } from 'src/layouts/Auth/AuthLayout'
import { mapUserToModel } from 'mapping-services'

// xiwabi4275@byorby.com
interface SignUpForm {
  email: string
  password: string
  confirmPassword: string
}

const emailPatternValidator = {
  value: /.+@.+\..+/,
  message: 'Incorrect email pattern'
}

export const SignUp = (): JSX.Element => {
  const { register, handleSubmit, getValues, formState: { errors, isValid } } = useForm<SignUpForm>({
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

  const navigate = useNavigate()
  const theme = useTheme()
  const { registrationStore, userStore } = useStore()

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = (): void => { setShowPassword((show) => !show) }
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
  }

  const onSubmit = async (data: SignUpForm): Promise<void> => {
    if (!data.email || !data.password) {
      throw new Error('No email or password provided!')
    }
    setBackdropVisible(true)
    setBackdropMessage('Checking email')
    try {
      const email = data.email.toLowerCase()
      const password = data.password
      const response = await userApiService.createUserV2({ email, password })
      userStore.setUser(mapUserToModel(response))
      registrationStore.setCredentials(email, password)
      setBackdropVisible(false)
      navigate('/auth/email-verification')
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

  return <>
    <div className={styles.headerSection}>
      <Typography variant='h1'>Sign Up</Typography>
      <Typography variant='body1'>Already have an account? <Link to='/auth/login'>
        <Typography component='span' sx={{ color: theme.palette.primary.main }}>Log in</Typography>
      </Link></Typography>
    </div>
    <div className={styles.group}>
      <TextField fullWidth label="E-mail"
        type='email'
        error={!(errors.email == null)}
        autoComplete='off'
        variant="outlined"
        size="small"
        {...register('email', { pattern: emailPatternValidator, required: 'Email is required' })}
        helperText={errors.email?.message ?? ''} />

      <TextField fullWidth label="Password"
        type={showPassword ? 'text' : 'password'}
        error={!(errors.password == null)}
        variant="outlined"
        size="small"
        autoComplete='off'
        {...register('password', {
          required: 'Code is required',
          minLength: minLength(8)
        })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
        helperText={errors.password?.message ?? ''} />

      <TextField fullWidth label="Confirm password"
        type={showPassword ? 'text' : 'password'}
        error={!(errors.confirmPassword == null)}
        autoComplete='off'
        variant="outlined"
        size="small"
        {...register('confirmPassword', {
          required: 'Required',
          minLength: minLength(8),
          validate: {
            samePassword: value => (value === getValues().password) || 'Passwords won\'t match'
          }
        })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
        helperText={errors.confirmPassword?.message ?? ''} />

      <Button disabled={!isValid}
        onClick={(e) => { void handleSubmit(onSubmit)(e) }}
        variant="contained"
        sx={{ width: '60%' }}>
        Sign up
      </Button>
    </div>
    {/* <div className={styles.divider}>
      <Divider>OR</Divider>
      <Typography variant='h2'>Sign Up with</Typography>
    </div>
    <div className={styles.buttons}>
      <Button variant="outlined" size='small' startIcon={
        <GoogleIcon width={20} height={20} />}>
        Google
      </Button>
      <Button variant="outlined" size='small' startIcon={
        <FacebookIcon width={20} height={20} />}>
        Facebook
      </Button>
      <Button variant="outlined" size='small' startIcon={
        <AppleIcon width={20} height={20} />}>
        Apple
      </Button>
    </div> */}
  </>
}
