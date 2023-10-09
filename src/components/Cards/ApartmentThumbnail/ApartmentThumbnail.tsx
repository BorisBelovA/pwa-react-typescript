import { type Apartment } from 'models'
import styles from './ApartmentThumbnail.module.scss'
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface Props {
  apartment: Apartment
}
const ApartmentThumbnail = ({ apartment }: Props): JSX.Element => {
  const navigate = useNavigate()
  return (
    <Box key={apartment.id} className={styles.apartmentThumbnail} onClick={() => { navigate(`apartment/${apartment.id}`) }}>
      <Box className={styles.apartmentThumbnail__photo}>
        {apartment.photos.length > 0
          ? <img src={apartment.photos[0]} height='120' className={styles.apartmentThumbnail__photo_img} />
          : <Box className={styles.apartmentThumbnail__photo_nophoto}>
            <Typography variant='subtitle1'>No photo</Typography>
          </Box>
        }
      </Box>
      <Box className={styles.apartmentThumbnail__content}>
        <Typography variant='h2'>{apartment.totalPrice} ₪</Typography>
        <Typography variant='subtitle1'>{apartment.countRooms} rooms</Typography>
        <Typography variant='subtitle1' className={styles.apartmentThumbnail__content_location}>
          {apartment.location.country.name} {apartment.location.city?.name}
        </Typography>
        <Typography variant='body1'>{apartment.description !== '' ? apartment.description : 'No description'}</Typography>
      </Box>
    </Box>
  )
}
export default ApartmentThumbnail
