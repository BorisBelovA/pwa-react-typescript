import { Avatar, Box, IconButton, Typography, useTheme } from '@mui/material'
import CardBase from '../CardBase/CardBase'
import { type AuthUser, type Apartment, ProfileRoutes, ApartmentsRoutes } from 'models'
import { mapCurrencyToSign } from 'src/utils/currency'
import { calculateAge } from 'src/utils/date-time'
import styles from './CardApartment.module.scss'
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'

interface Props {
  apartment: Apartment
  user?: AuthUser
  who?: string
  flipCard?: () => void
  editable?: boolean
}
const CardApartment = ({ apartment, user, who, flipCard, editable }: Props): JSX.Element => {
  const navigate = useNavigate()
  const theme = useTheme()
  const header = (<>
    <Box className={styles.head}>
      <Typography variant='h1'>{apartment.totalPrice} {mapCurrencyToSign(apartment.currency)} per room</Typography>
      {editable &&
        <IconButton sx={{ color: theme.palette.primary.main }}
          className={styles.icon__edit}
          size='small'
          aria-label="edit"
          onClick={() => { navigate(`/profile/${ProfileRoutes.MY_APARTMENT}/${ApartmentsRoutes.EDIT}/basic?id=${apartment.id}`) }}>
          <EditIcon fontSize='small' />
          <Typography fontSize={14} marginLeft='0.5rem'>Edit</Typography>
        </IconButton>
      }
    </Box>
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
