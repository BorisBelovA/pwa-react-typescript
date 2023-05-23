import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Avatar, Box, IconButton, Typography } from '@mui/material'
import { useStore } from 'src/utils/StoreProvider'
import styles from './Profile.module.scss'
import SettingsNavigationButton from 'src/components/navigation/SettingsNavigationButton/SettingsNavigationButton'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

const Profile: React.FunctionComponent = observer(() => {
  const { userStore } = useStore()
  return (
    <Box className={styles.profile__container}>
      <Box className={styles.profile__header}>
        <Box className={styles.profile__header__avatar_and_name}>
          <Avatar src={userStore.avatar ?? ''} />
          <Typography variant='h2'>Hi,
            {userStore.firstName &&
              ` ${userStore.firstName} ${userStore.lastName}`
            }
          </Typography>
        </Box>
        <IconButton>
          <LogoutRoundedIcon color='primary' />
        </IconButton>
      </Box>
      <Box className={styles.profile__menu}>
        <SettingsNavigationButton to='/profile/my-preferences/'>Profile</SettingsNavigationButton>
        <SettingsNavigationButton to='/profile/roommate-preferences/'>Roommate preferences</SettingsNavigationButton>
        <SettingsNavigationButton to='/profile/my-appartments/'>My appartments</SettingsNavigationButton>
        <SettingsNavigationButton to='/profile/settings/'>Settings</SettingsNavigationButton>
        <SettingsNavigationButton to=''>Helpdesk</SettingsNavigationButton>
        <SettingsNavigationButton to=''>FAQ</SettingsNavigationButton>
        <SettingsNavigationButton to=''>Confidentiality</SettingsNavigationButton>
        <SettingsNavigationButton to=''>About us</SettingsNavigationButton>
        <SettingsNavigationButton to=''>Language</SettingsNavigationButton>
      </Box>
      <Box className={styles.profile__temp}>
        <Typography variant='h2'>Useful links</Typography>
        <Link to="/auth/login">Login</Link>
        <Link to="/auth/signup">Sign up</Link>
        <Link to="/profile/questionnaire-basic-info/who">Questionnaire Basics</Link>
      </Box>
    </Box>
  )
})

export default Profile
