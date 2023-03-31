import { type ValidationRule } from 'react-hook-form';

export const minLength = (length: number): ValidationRule<number> => ({
  value: length,
  message: `Min length ${length} symbols`
})
