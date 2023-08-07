import { Box, Button, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import styles from '../ResetPassword.module.scss'
import OtpInput from 'react-otp-input'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { minLength } from 'src/utils/validations'

interface ResetForm {
  email: string
  password: string
  confirmPassword: string
}

const Reset = (): JSX.Element => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const { register, handleSubmit, getValues, formState: { errors, isValid } } = useForm<ResetForm>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'all'
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfPassword, setShowConfPassword] = useState(false)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault()
  }

  const onSubmit = async (data: ResetForm): Promise<void> => {
    navigate('/auth/reset-password/success')
  }

  return (
    <Box className={styles.form}>
      <Box className={styles.form__head}>
        <Typography variant='h1'>Reset password</Typography>
        <Typography>for mail@mail.com</Typography>
      </Box>

      <Box className={`${styles.form__input} ${styles.center}`}>
        <Typography>Enter code from your email</Typography>
        <OtpInput
          value={otp}
          onChange={setOtp}
          placeholder='____'
          isInputNum={true}
          numInputs={4}
          inputStyle={styles.otp}
          containerStyle={styles.otp__container}
        />
      </Box>

      <Box className={styles.form__input}>
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

        <TextField fullWidth label="Confirm password"
          type={showConfPassword ? 'text' : 'password'}
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
          Reset password
        </Button>
        <Link component={RouterLink} to='/auth/login' className={styles.form__link}>Back to login</Link>
      </Box>
    </Box>
  )
}
export default Reset
