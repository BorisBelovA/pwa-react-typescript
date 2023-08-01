import { Typography } from '@mui/material'
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Phone from 'src/components/BasicInfoSteps/Phone'
import { type NewUser } from '../../../models/user'
import styles from './SecondStep.module.scss'

export interface SecondStepProps {
  user: NewUser
  phoneChanged: (phone: string) => void
  stepValid: (valid: boolean) => void
}

export const SecondStep = (props: SecondStepProps): JSX.Element => {
  const { control, watch, formState: { isValid } } = useForm<{ phone: string }>({
    defaultValues: {
      phone: props.user.phone ?? ''
    },
    mode: 'all'
  })

  useEffect(() => {
    const subscription = watch(({ phone }) => {
      props.stepValid(!!phone && matchIsValidTel(phone ?? ''))
      props.phoneChanged(phone ?? '')
    })
    return () => { subscription.unsubscribe() }
  }, [watch, isValid, props])

  return <div className={styles.container}>
    <Typography variant='h1' >Phone number</Typography>
    <Phone control={control} />
  </div>
}
 