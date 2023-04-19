import { TextField, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import styles from './FirstStep.module.scss'
import { type EmptyPersonalInfo, type NewUser } from '../../../models/user'
import moment from 'moment'

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
        <TextField fullWidth label="First name"
          error={!(errors.firstName == null)}
          variant="outlined"
          size="small"
          {...register('firstName', {
            required: 'First name is required'
          })}
          helperText={errors.firstName?.message ?? ''} />

        <TextField fullWidth label="Last name"
          error={!(errors.lastName == null)}
          variant="outlined"
          size="small"
          {...register('lastName', { required: 'Last name is required' })}
          helperText={errors.lastName?.message ?? ''} />

        <FormControl fullWidth size="small">
          <InputLabel id="gender-select-label">Gender</InputLabel>
          <Controller
            render={({ field: { onChange, onBlur, value, ref } }) =>
              <Select labelId="gender-select-label"
                id="gender-select"
                defaultValue={user.gender}
                label="Gender"
                onChange={onChange} // send value to hook form
                onBlur={onBlur} // notify when input is touched
                value={value} // return updated value
                ref={ref}>
                <MenuItem value={'M'}>M</MenuItem>
                <MenuItem value={'F'}>F</MenuItem>
              </Select>
            }
            name='gender'
            control={control}
          />
        </FormControl>

        <Controller
          name='birthday'
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MobileDatePicker
                label="Birthdate"
                inputFormat="MM/DD/YYYY"
                {...register('birthday')}
                value={value}
                onChange={(date) => {
                  onChange((date as unknown as moment.Moment).toDate())
                }}
                ref={ref}
                renderInput={(params) => <TextField {...params} onChange={(event) => {
                  const value = event.target.value
                  if (value.length > 0 && moment(value, 'DD/MM/YYYY', true).isValid()) {
                    onChange(moment(value, 'DD/MM/YYYY', true).toDate())
                  }
                }} />}
              />
            </LocalizationProvider>
          )}
        />
    </div>
  </div>
}