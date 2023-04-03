import { Box, IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import styles from '../../Profile.module.scss'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'

const AccountSettings = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <Box className={styles.profile__container}>
      <Box className={styles.profile__header}>
        <IconButton onClick={() => {navigate(-1)}}>
          <ArrowBackIosNewRoundedIcon color='primary' />
        </IconButton>
        <Typography variant='h1'>Account</Typography>
      </Box>
    </Box>
  )
}
export default AccountSettings
