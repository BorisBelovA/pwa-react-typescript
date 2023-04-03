import { Box, IconButton, Typography } from "@mui/material"
import styles from '../Profile.module.scss'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import { useNavigate } from "react-router-dom"
import SettingsNavigationButton from "src/components/navigation/SettingsNavigationButton/SettingsNavigationButton"

const MyPreferences = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <Box className={styles.profile__container}>
      <Box className={styles.profile__header}>
        <IconButton onClick={() => { navigate(-1) }}>
          <ArrowBackIosNewRoundedIcon color='primary' />
        </IconButton>
        <Typography variant='h1'>Profile</Typography>
      </Box>
      <Box className={styles.profile__menu}>
        <SettingsNavigationButton to='/profile/my-preferences/about-me/'>About me</SettingsNavigationButton>
        <SettingsNavigationButton to='/profile/my-preferences/basic-questions/'>Basic questionnaire</SettingsNavigationButton>
      </Box>
    </Box>
  )
}
export default MyPreferences
