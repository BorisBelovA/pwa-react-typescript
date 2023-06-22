import { Box, Button, IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import styles from '../../Profile.module.scss'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import { useStore } from 'src/utils/StoreProvider'
import { ProfileRoutes } from 'models'

const AccountSettings = (): JSX.Element => {
  const navigate = useNavigate()
  const { userStore } = useStore()
  return (
    <Box className={styles.profile__container}>
      <Box className={styles.profile__header}>
        <IconButton onClick={() => { navigate(-1) }}>
          <ArrowBackIosNewRoundedIcon color='primary' />
        </IconButton>
        <Typography variant='h1'>Account</Typography>
      </Box>
      <Box>
        <Button variant="outlined"
          color="error"
          fullWidth
          onClick={() => {
            userStore.deleteFromStorage()
            navigate('/profile')
          }}
        >Logout</Button>
      </Box>
    </Box>
  )
}
export default AccountSettings
