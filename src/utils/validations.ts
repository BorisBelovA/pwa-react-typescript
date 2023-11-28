import { type ValidationRule } from 'react-hook-form'
import { t } from '@lingui/macro'

export const minLength = (length: number): ValidationRule<number> => ({
  value: length,
  message: t`Min length ${length} symbols`
})

export const emailPatternRegExp = /.+@.+\..+/

export const emailPatternValidator = {
  value: emailPatternRegExp,
  message: t`Incorrect email pattern`
}
