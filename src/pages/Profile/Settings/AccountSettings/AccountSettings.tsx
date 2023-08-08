import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import styles from '../../Profile.module.scss'
import { useStore } from 'src/utils/StoreProvider'
import BackButton from 'src/components/Buttons/BackButton/BackButton'

const AccountSettings = (): JSX.Element => {
  const navigate = useNavigate()
  const { userStore, questionnaireStore, apartmentStore } = useStore()
  return (
    <Box className={styles.profile__container}>
      <Box className={`${styles.profile__header} ${styles.mb1}`}>
        <BackButton />
        <Typography variant='h1'>Account</Typography>
      </Box>
      <Box>
        <Button variant="outlined"
          color="error"
          fullWidth
          onClick={() => {
            userStore.deleteFromStorage()
            questionnaireStore.deleteQuestionnaire()
            apartmentStore.deleteApartments()
            navigate('/profile')
          }}
        >Logout</Button>
      </Box>
    </Box>
  )
}
export default AccountSettings
