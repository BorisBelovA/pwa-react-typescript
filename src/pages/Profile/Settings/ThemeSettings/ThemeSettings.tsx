import { Box, type PaletteMode, Typography } from '@mui/material'
import commonStyles from '../../Profile.module.scss'
import styles from './ThemeSettings.module.scss'
import { type Option, OptionCards } from 'src/components/OptionCards/OptionCards'
import { useStore } from 'src/utils/StoreProvider'
import BackButton from 'src/components/Buttons/BackButton/BackButton'
import { Trans, t } from '@lingui/macro'

const ThemeSettings = (): JSX.Element => {
  const { themeStore } = useStore()
  const options: Array<Option<PaletteMode | null>> = [
    { text: t({ message: 'Light' }), value: 'light', icon: 'light_mode' },
    { text: t({ message: 'Dark' }), value: 'dark', icon: 'dark_mode' },
    { text: t({ message: 'System' }), value: null, icon: 'compare' }
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
        <Typography variant='h1'>
          <Trans>Color theme</Trans>
        </Typography>
      </Box>
      <Box className={styles.content}>
        <Typography variant='h1'>
          <Trans>Choose preferred color theme</Trans>
        </Typography>
        <OptionCards options={options}
          selected={themeStore.theme}
          selectCallback={choose}></OptionCards>
      </Box>
    </Box>
  )
}
export default ThemeSettings
