import { Box, IconButton, Typography } from "@mui/material"
import styles from '../Profile.module.scss'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import { useNavigate } from "react-router-dom"
import SettingsNavigationButton from "src/components/navigation/SettingsNavigationButton/SettingsNavigationButton"
import BackButton from "src/components/Buttons/BackButton/BackButton"

const Settings = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <Box className={styles.profile__container}>
      <Box className={styles.profile__header}>
        <BackButton />
        <Typography variant='h1'>Settings</Typography>
      </Box>
      <Box className={styles.profile__menu}>
        <SettingsNavigationButton to='/profile/settings/account/'>Account</SettingsNavigationButton>
        <SettingsNavigationButton to='/profile/settings/theme/'>Color theme</SettingsNavigationButton>
      </Box>
    </Box>
  )
}
export default Settings
