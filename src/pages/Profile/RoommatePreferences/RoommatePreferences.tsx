import { Box, IconButton, Typography } from "@mui/material"
import styles from '../Profile.module.scss'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import { useNavigate } from "react-router-dom"
import SettingsNavigationButton from "src/components/navigation/SettingsNavigationButton/SettingsNavigationButton"

const RoommatePreferences = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <Box className={styles.profile__container}>
      <Box className={styles.profile__header}>
        <IconButton onClick={() => { navigate(-1) }}>
          <ArrowBackIosNewRoundedIcon color='primary' />
        </IconButton>
        <Typography variant='h1'>Roommate preferences</Typography>
      </Box>
      <Box className={styles.profile__menu}>
        <SettingsNavigationButton to='/profile/roommate-preferences/basic-questions/'>Basic questions</SettingsNavigationButton>
      </Box>
    </Box>
  )
}
export default RoommatePreferences