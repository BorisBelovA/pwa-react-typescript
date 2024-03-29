import { Typography } from '@mui/material'
import { matchIsValidTel } from 'mui-tel-input'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Phone from 'components/BasicInfoSteps/Phone'
import { type NewUser } from '../../../models/user'
import styles from './SecondStep.module.scss'
import { t } from '@lingui/macro'

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
    <Typography variant='h1' >{t`Phone number`}</Typography>
    <Phone control={control} />
  </div>
}
