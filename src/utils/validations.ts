import { type ValidationRule } from 'react-hook-form'

export const minLength = (length: number): ValidationRule<number> => ({
  value: length,
  message: `Min length ${length} symbols`
})

export const emailPatternRegExp = /.+@.+\..+/

export const emailPatternValidator = {
  value: emailPatternRegExp,
  message: 'Incorrect email pattern'
}
