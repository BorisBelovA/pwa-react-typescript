import { Box, Button, Divider, IconButton, InputAdornment, type SxProps, TextField, Typography, useTheme } from '@mui/material'
import { ReactComponent as GoogleIcon } from '../../assets/sm-icons/GoogleIcon.svg'
import { ReactComponent as AppleIcon } from '../../assets/sm-icons/AppleIcon.svg'
import { ReactComponent as FacebookIcon } from '../../assets/sm-icons/FacebookIcon.svg'
import { useState } from 'react'
import { useForm, type ValidationRule } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import utilityStyles from '../../styles/utility.module.scss'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { userApiService, sessionService } from 'api-services'
import { useAuthContext } from 'src/layouts/Auth/AuthLayout'
import { emailPatternValidator } from 'src/utils/validations'
import { mapAuthenticatedUserData, mapBase64ToFile, mapPhotoNameToURI } from 'mapping-services'
import { useStore } from 'src/utils/StoreProvider'
import { filesApiService } from 'src/api/api-services/files'
interface SignUpForm {
  email: string
  password: string
}

const minLength = (length: number): ValidationRule<number> => ({
  value: length,
  message: `Min length ${length} symbols`
})

const sxSMButtons: SxProps = {
  display: 'flex',
  gap: '1rem',
  paddingY: '.75rem',
  justifyContent: 'left'
}

export const Login = (): JSX.Element => {
  const navigate = useNavigate()
  const { setMessage, setBackdropMessage, setBackdropVisible } = useAuthContext()
  const { userStore } = useStore()
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
    setBackdropMessage('Login to your account')
    try {
      const token = await userApiService.login(data.email, data.password)
      sessionService.authToken = token
      const userInfo = await userApiService.getAuthenticatedUser(token)
      const [user, quest] = mapAuthenticatedUserData(userInfo)
      if (user.avatar) {
        user.avatar = mapPhotoNameToURI(user.avatar)
      }
      if (user.photo) {
        user.photo = mapPhotoNameToURI(user.photo)
      }
      userStore.setUser(user)
      setTimeout(() => {
        setBackdropVisible(false)
        navigate('/profile')
      }, 1500)
    } catch (e) {
      console.error(e)
      let text = 'Something went wrong😮'
      if (e instanceof Error) {
        text = e.message
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
      <Typography variant='h1'>Log in</Typography>
      <Typography>New to roommate.host? <Link to='/auth/signup'><Typography component='span' sx={{ color: theme.palette.primary.main }}>Sign up</Typography></Link></Typography>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem', width: '100%', alignItems: 'center' }}>
      <TextField fullWidth label="E-mail"
        type='email'
        error={!(errors.email == null)}
        variant="outlined"
        size="small"
        {...register('email', { pattern: emailPatternValidator, required: 'Email is required' })}
        helperText={errors.email?.message ?? ''} />

      <TextField fullWidth label="Password"
        type={showPassword ? 'text' : 'password'}
        error={!(errors.password == null)}
        variant="outlined"
        size="small"
        {...register('password', { required: 'Password is required', minLength: minLength(8) })}
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
        sx={{ width: '50%' }}
      >
        Log in
      </Button>
    </Box>
    <Box sx={{ width: '100%', alignItems: 'center', marginY: '1.5rem' }}>
      <Divider><Typography variant='h2'>or</Typography></Divider>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '.5rem', width: '100%' }}>
      <Button variant="outlined" sx={sxSMButtons}>
        <GoogleIcon className={utilityStyles.smIcon} />Log in with Google
      </Button>
      <Button variant="outlined" sx={sxSMButtons}>
        <FacebookIcon className={utilityStyles.smIcon} />Log in with Facebook
      </Button>
      <Button variant="outlined" sx={sxSMButtons}>
        <AppleIcon className={utilityStyles.smIcon} />Log in with Apple
      </Button>
    </Box>
  </>
}
