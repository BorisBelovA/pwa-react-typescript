import { Button, Divider, IconButton, InputAdornment, SxProps, TextField, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { useForm, type ValidationRule } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Signup.module.scss'
import { ReactComponent as AppleIcon } from '../../assets/sm-icons/AppleIcon.svg'
import { ReactComponent as FacebookIcon } from '../../assets/sm-icons/FacebookIcon.svg'
import { ReactComponent as GoogleIcon } from '../../assets/sm-icons/GoogleIcon.svg'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { minLength } from 'src/utils/validations'
import { useStore } from 'src/utils/StoreProvider'

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

  const navigate = useNavigate()
  const theme = useTheme()
  const { userStore } = useStore()

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = (): void => { setShowPassword((show) => !show) }
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
  }

  const onSubmit = (data: SignUpForm): void => {
    userStore.setEmail(data.email)
    userStore.setPassword(data.password)
    navigate('/auth/terms')
  }

  const iconsProps: SxProps = {
    widows: '20px',
    height: '20px'
  }

  return <>
    <div className={styles.headerSection}>
      <Typography variant='h1'>Sign Up</Typography>
      <Typography variant='body1'>Already have an account? <Link to='/auth/login'><Typography component='span' sx={{ color: theme.palette.primary.main }}>Log in</Typography></Link></Typography>
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
        autoComplete='new-password'
        variant="outlined"
        size="small"
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
        sx={{width: '60%'}}>
        Sign up
      </Button>
    </div>
    {/* <Box sx={{ width: '100%', alignItems: 'center', marginY: '1.5rem' }}>
      <Divider><Typography variant='h2'>or</Typography></Divider>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '.5rem', width: '100%' }}>
      <Button variant="outlined" sx={sxSMButtons}>
        <GoogleIcon className={styles.smIcon} />Sign up with Google
      </Button>
      <Button variant="outlined" sx={sxSMButtons}>
        <FacebookIcon className={styles.smIcon} />Sign up with Facebook
      </Button>
      <Button variant="outlined" sx={sxSMButtons}>
        <AppleIcon className={styles.smIcon} />Sign up with Apple
      </Button>
    </Box> */}
    <div className={styles.divider}>
      <Divider>OR</Divider>
      <Typography variant='h2'>Sign Up with</Typography>
    </div>
    <div className={styles.buttons}>
      <Button variant="outlined" size='small' startIcon={
        <GoogleIcon width={20} height={20}/>}>
        Google
      </Button>
      <Button variant="outlined" size='small' startIcon={
        <FacebookIcon width={20} height={20}/>}>
        Facebook
      </Button>
      <Button variant="outlined" size='small' startIcon={
        <AppleIcon width={20} height={20} />}>
        Apple
      </Button>
    </div>
  </>
}
