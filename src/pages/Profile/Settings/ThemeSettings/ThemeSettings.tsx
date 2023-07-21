import { Box, IconButton, PaletteMode, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import commonStyles from '../../Profile.module.scss'
import styles from './ThemeSettings.module.scss'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import { type Option, OptionCards } from 'src/components/OptionCards/OptionCards'
import { useStore } from 'src/utils/StoreProvider'

const ThemeSettings = (): JSX.Element => {
  const navigate = useNavigate()
  const { themeStore } = useStore()
  const options: Array<Option<PaletteMode | null>> = [
    { text: 'Light', value: 'light', icon: 'light_mode' },
    { text: 'Dark', value: 'dark', icon: 'dark_mode' },
    { text: 'System', value: null, icon: 'compare' }
  ]
  const choose = (theme: PaletteMode | null): void => {
    if (theme) {
      themeStore.setTheme(theme)
    } else {
      themeStore.setSystemTheme()
    }
  }

  return (
    <Box className={commonStyles.profile__container}>
      <Box className={commonStyles.profile__header}>
        <IconButton onClick={() => { navigate(-1) }}>
          <ArrowBackIosNewRoundedIcon color='primary' />
        </IconButton>
        <Typography variant='h1'>Color theme</Typography>
      </Box>
      <Box className={styles.content}>
        <Typography variant='h1'>Choose preferred theme</Typography>
        <OptionCards options={options}
          selected={themeStore.theme}
          selectCallback={choose}></OptionCards>
      </Box>
    </Box>
  )
}
export default ThemeSettings
