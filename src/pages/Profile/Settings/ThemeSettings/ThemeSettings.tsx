import { Box, IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import styles from '../../Profile.module.scss'
import themeStyles from './ThemeSettings.module.scss'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import ThemeButton from 'src/components/Buttons/ThemeButton/ThemeButton'

const ThemeSettings = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <Box className={styles.profile__container}>
      <Box className={styles.profile__header}>
        <IconButton onClick={ () => { navigate(-1) } }>
          <ArrowBackIosNewRoundedIcon color='primary' />
        </IconButton>
        <Typography variant='h1'>Color theme</Typography>
      </Box>
      <Box className={styles.profile__content}>
        <Box className={styles.profile__input}>
          <Typography>Choose preferred theme</Typography>
          <Box className={themeStyles.theme__buttons}>
            <ThemeButton theme='dark' text='Dark' />
            <ThemeButton theme='light' text='Light' />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default ThemeSettings
