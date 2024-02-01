import { type Apartment } from 'models'
import styles from './ApartmentThumbnail.module.scss'
import { Box, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { t } from '@lingui/macro'

interface Props {
  apartment: Apartment
  'data-intro-id'?: string
}
const ApartmentThumbnail = ({ apartment, ...dataAttributes }: Props): JSX.Element => {
  const navigate = useNavigate()
  return (
    <Paper {...dataAttributes}
      key={apartment.id}
      className={styles.apartmentThumbnail}
      onClick={() => { navigate(`apartment/${apartment.id}`) }}
    >
      <Box className={styles.apartmentThumbnail__photo}>
        {apartment.photos.length > 0
          ? <img src={apartment.photos[0]} height='120' className={styles.apartmentThumbnail__photo_img} />
          : <Box className={styles.apartmentThumbnail__photo_nophoto}>
            <Typography variant='subtitle1'>{t`No photo`}</Typography>
          </Box>
        }
      </Box>
      <Box className={styles.apartmentThumbnail__content}>
        {apartment.totalPrice > 0
          ? <Typography variant='h2'>{apartment.totalPrice} ₪</Typography>
          : <Box data-intro-id='apartment-for-refugees-flag'
              className={styles.apartmentThumbnail__free}>{t`For refugees`}</Box>
        }
        {apartment.totalPrice > 0
          ? <Typography variant='subtitle1'>{t`${apartment.countRooms} rooms`}</Typography>
          : <Typography variant='subtitle1'>{t`Can accept ${apartment.countRooms} people`}</Typography>
        }
        <Typography variant='subtitle1' className={styles.apartmentThumbnail__content_location}>
          {apartment.location.country.name} {apartment.location.city?.name} {apartment.location.address}
        </Typography>
        <Typography variant='body1' className={styles.apartmentThumbnail__content_description}>
          {apartment.description !== '' ? apartment.description : t`No description`}
        </Typography>
      </Box>
    </Paper>
  )
}
export default ApartmentThumbnail
