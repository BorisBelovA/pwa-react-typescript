import { t } from '@lingui/macro'
import { matchIsValidTel, MuiTelInput } from 'mui-tel-input'
import { type Control, Controller } from 'react-hook-form'

interface Props {
  control: Control<{ phone: string }, any>
  required?: boolean
}
const Phone = ({ control, required }: Props): JSX.Element => {
  return (
    <Controller name='phone' control={control}
      rules={{ validate: matchIsValidTel, required }}
      render={({ field, fieldState }) => (
        <MuiTelInput {...field} fullWidth
          helperText={(fieldState.error != null) ? t`Incorrect phone number` : ''}
          error={!(fieldState.error == null)} />
      )} />
  )
}
export default Phone
