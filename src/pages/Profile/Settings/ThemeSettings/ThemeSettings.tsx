import { Box, type PaletteMode, Typography } from '@mui/material'
import commonStyles from '../../Profile.module.scss'
import styles from './ThemeSettings.module.scss'
import { type Option, OptionCards } from 'src/components/OptionCards/OptionCards'
import { useStore } from 'src/utils/StoreProvider'
import BackButton from 'src/components/Buttons/BackButton/BackButton'

const ThemeSettings = (): JSX.Element => {
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
        <BackButton />
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
