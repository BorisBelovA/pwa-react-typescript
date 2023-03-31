import { Backdrop, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { sessionService, userApiService } from 'api-services';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'src/layouts/Auth/AuthLayout';
import { useStore } from 'src/utils/StoreProvider';
import { minLength } from 'src/utils/validations';

export const EmailCode = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  const { setMessage } = useAuthContext()
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<{ code: string }>({
    defaultValues: { code: '' },
    mode: 'all'
  })

  const { userStore } = useStore()

  const navigate = useNavigate()

  const verify = (data: { code: string }): void => {
    if (data.code.length === 0) {
      throw new Error('Code length is 0!!')
    }
    setLoading(true)
    userApiService.activateUser(data.code)
      .then(response => {
        return userApiService.login(userStore.email, userStore.password)
          .then(token => {
            sessionService.authToken = token
            navigate('/profile')
          })
      })
      .catch(error => {
        console.log(error)
        setMessage({
          text: 'Something went wrong 😨',
          visible: true,
          severity: 'error'
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return <>
    <Typography variant='h2'>Verify you email</Typography>
    <Typography variant='subtitle2'>paste the code you've recieved on your email</Typography>
    <TextField fullWidth
      sx={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
      {...register('code', {
        required: 'Required',
        minLength: minLength(8)
      })}
      label='Code'
      variant='outlined'
      error={!(errors.code == undefined)}
      helperText={errors.code?.message ?? ''} />
    <Button fullWidth
      disabled={!isValid}
      variant='contained'
      onClick={(e) => { handleSubmit(verify)(e) }}
    >
      Verify
    </Button>

    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  </>
}
