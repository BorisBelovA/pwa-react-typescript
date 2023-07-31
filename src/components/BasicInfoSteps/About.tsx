import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { EmptyPersonalInfo, NewUser } from "models"
import moment from "moment"
import { render } from "react-dom"
import { Control, Controller, FieldErrorsImpl, UseFormRegister } from "react-hook-form"

interface Props {
  register: UseFormRegister<EmptyPersonalInfo>,
  control: Control<EmptyPersonalInfo>,
  user: NewUser,
  errors: Partial<FieldErrorsImpl<EmptyPersonalInfo>>
}
const About = ({errors, register, control, user}: Props) => {
  return (
    <>
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
    </>
  )
}
export default About