import { Typography } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styles from './FirstStep.module.scss'
import { type EmptyPersonalInfo, type NewUser } from '../../../models/user'
import About from 'components/BasicInfoSteps/About'

export interface FirstStepProps {
  user: NewUser
  stepValid: (valid: boolean) => void
  userInfoChange: (info: Partial<NewUser>) => void
}

export const FirstStep = ({ user, stepValid, userInfoChange }: FirstStepProps): JSX.Element => {
  const { register, control, watch, formState: { errors } } = useForm<EmptyPersonalInfo>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      birthday: user.birthday
    },
    mode: 'all'
  })

  useEffect(() => {
    const subss = watch(({ firstName, lastName, gender, birthday }) => {
      const valid = !!firstName && !!lastName
      stepValid(valid)
      userInfoChange({ firstName, lastName, birthday, gender })
    })
    return () => { subss.unsubscribe() }
  }, [watch, errors, stepValid])

  return <div className={styles.container}>
    <Typography variant='h1' >Tell us about yourself</Typography>
    <div className={styles.formContainer}>
        <About control={control} errors={errors} register={register} user={user} />
    </div>
  </div>
}
