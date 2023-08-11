import { Typography } from '@mui/material'
import styles from './CardApartment.module.scss'
import CardBase from '../CardBase/CardBase'
import { Apartment } from 'models'

interface Props {
  apartment: Apartment
}
const CardApartment = ({apartment}: Props): JSX.Element => {
  const header = (<>
    <Typography variant='h1'>{apartment.totalPrice} {apartment.currency} per room</Typography>
    <Typography>{apartment.countAvailableRooms} out of {apartment.countRooms} rooms available</Typography>
  </>)

  const content = (<>
    <Typography>{apartment.description}</Typography>
  </>)

  return (
    <CardBase header={header} content={content} photo={apartment.photos}/>
  )
}
export default CardApartment
