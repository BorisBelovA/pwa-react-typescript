import moment from 'moment'

// DD.MM.YYYY
export const mapToRusFormat = (date: Date): string => {
  return moment(date).format('DD.MM.YYYY')
}

export const calculateAge = (date: Date): number => {
  return moment().diff(date, 'years')
}

export const getMessageTime = (date: Date): string => {
  return moment(date).format('h:mm A')
}
