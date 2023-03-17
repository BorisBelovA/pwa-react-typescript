import { Box, Button, Divider, IconButton, InputAdornment, type SxProps, TextField, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { useForm, type ValidationRule } from 'react-hook-form'
import { ReactComponent as GoogleIcon } from '../../assets/sm-icons/GoogleIcon.svg'
import { ReactComponent as AppleIcon } from '../../assets/sm-icons/AppleIcon.svg'
import { ReactComponent as FacebookIcon } from '../../assets/sm-icons/FacebookIcon.svg'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../../styles/utility.module.scss'
import { Visibility, VisibilityOff } from '@mui/icons-material'

interface SignUpForm {
  email: string
  password: string
  confirmPassword: string
}

const emailPatternValidator = {
  value: /.+@.+\..+/,
  message: 'Incorrect email pattern'
}

const minLength = (length: number): ValidationRule<number> => ({
  value: length,
  message: `Min length ${length} symbols`
})

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

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = (): void => { setShowPassword((show) => !show) }
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
  }

  const onSubmit = (data: SignUpForm): void => {
    navigate('/auth/terms')
  }

  const sxSMButtons: SxProps = {
    display: 'flex',
    gap: '1rem',
    paddingY: '.75rem',
    justifyContent: 'left'
  }

  return <>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '.5rem', alignItems: 'center' }}>
      <Typography variant='h1'>Sign Up</Typography>
      <Typography variant='body1'>Already have an account? <Link to='/auth/login'><Typography component='span' sx={{ color: theme.palette.primary.main }}>Log in</Typography></Link></Typography>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', marginTop: '1.5rem', alignItems: 'center' }}>
      <TextField fullWidth label="E-mail"
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
          required: 'Required',
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
        onClick={() => handleSubmit(onSubmit)}
        fullWidth
        variant="contained"
        sx={{ color: theme.palette.background.paper, width: '50%' }}
      >
        Sign Up
      </Button>
    </Box>
    <Box sx={{ width: '100%', alignItems: 'center', marginY: '1.5rem' }}>
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
    </Box>
  </>
}
