import { type Currency } from 'models'

export const mapCurrencyToSign = (currency: Currency): string => {
  switch (currency) {
    case 'EUR': return '€'
    case 'USD': return '$'
    case 'ILS': return '₪'
    default: throw new Error('Unknown currency type!')
  }
}
