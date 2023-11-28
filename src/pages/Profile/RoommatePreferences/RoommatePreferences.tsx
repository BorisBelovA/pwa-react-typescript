import { Box, Typography } from '@mui/material'
import styles from '../Profile.module.scss'
import SettingsNavigationButton from 'components/navigation/SettingsNavigationButton/SettingsNavigationButton'
import BackButton from 'components/Buttons/BackButton/BackButton'

const RoommatePreferences = (): JSX.Element => {
  return (
    <Box className={styles.profile__container}>
      <Box className={styles.profile__header}>
        <BackButton />
        <Typography variant='h1'>Roommate preferences</Typography>
      </Box>
      <Box className={styles.profile__menu}>
        <SettingsNavigationButton to='/profile/roommate-preferences/basic-questions/'>Basic questions</SettingsNavigationButton>
      </Box>
    </Box>
  )
}
export default RoommatePreferences
