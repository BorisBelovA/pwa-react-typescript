import { Avatar, Box, Typography } from '@mui/material'
import CardBase from '../CardBase/CardBase'
import { type AuthUser, type Apartment } from 'models'
import { mapCurrencyToSign } from 'src/utils/currency'
import { calculateAge } from 'src/utils/date-time'
import styles from './CardApartment.module.scss'
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';

interface Props {
  apartment: Apartment
  user?: AuthUser
  who?: string
  flipCard?: () => void
}
const CardApartment = ({ apartment, user, who, flipCard }: Props): JSX.Element => {
  const header = (<>
    <Typography variant='h1'>{apartment.totalPrice} {mapCurrencyToSign(apartment.currency)} per room</Typography>
    <Typography>{apartment.countAvailableRooms} out of {apartment.countRooms} rooms available</Typography>
  </>)

  const content = (<>
    {user &&
      <Box className={styles.user__thumb} onClick={flipCard}>
        <Avatar src={user.avatar ?? ''} alt={user.firstName} />
        <Box>
          <Typography variant='h2'>{user.firstName}, {calculateAge(user.birthday)}</Typography>
          <Typography>{who}</Typography>
        </Box>
        <FlipCameraAndroidIcon color='primary' fontSize='large' />
      </Box>}
    <Typography>{apartment.description}</Typography>
  </>)

  return (
    <CardBase header={header} content={content} photo={apartment.photos} />
  )
}
export default CardApartment
