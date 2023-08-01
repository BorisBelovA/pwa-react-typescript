import { matchIsValidTel, MuiTelInput } from "mui-tel-input"
import { Control, Controller } from "react-hook-form"

interface Props {
  control: Control<{ phone: string; }, any>
}
const Phone = ({ control }: Props) => {
  return (
    <Controller name='phone' control={control}
      rules={{ validate: matchIsValidTel }}
      render={({ field, fieldState }) => (
        <MuiTelInput {...field} fullWidth
          helperText={(fieldState.error != null) ? 'Incorrect phone number' : ''}
          error={!(fieldState.error == null)} />
      )} />
  )
}
export default Phone