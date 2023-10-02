import { type Apartment } from 'models'
import styles from './ApartmentThumbnail.module.scss'
import { Box, Typography } from '@mui/material'

interface Props {
  apartment: Apartment
}
const ApartmentThumbnail = ({ apartment }: Props): JSX.Element => {
  return (
    <Box key={apartment.id} className={styles.apartmentThumbnail}>
      <Box className={styles.apartmentThumbnail__photo}>
        <img src={apartment.photos[0]} height='120' className={styles.apartmentThumbnail__photo_img} />
      </Box>
      <Box className={styles.apartmentThumbnail__content}>
        <Typography variant='h2'>{apartment.totalPrice} ₪</Typography>
        <Typography variant='subtitle1'>{apartment.countRooms} rooms</Typography>
        <Typography variant='subtitle1'>{apartment.location.country.name} {apartment.location.city?.name}</Typography>
        <Typography variant='body1'>{apartment.description}</Typography>
      </Box>
    </Box>
  )
}
export default ApartmentThumbnail
