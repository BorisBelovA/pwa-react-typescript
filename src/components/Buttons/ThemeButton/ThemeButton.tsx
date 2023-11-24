import { Box, Card, type PaletteMode, Typography } from '@mui/material'
import styles from './ThemeButton.module.scss'
import { useStore } from 'utils/StoreProvider'

interface Props {
  theme: PaletteMode
  text: string
}

const ThemeButton = (props: Props): JSX.Element => {
  const { theme, text } = props
  const { themeStore } = useStore()
  return (
    <Card className={styles.themeButton} onClick={() => { themeStore.setTheme(theme) }}>
      <Typography variant='h2'>{text}</Typography>
      <Box
        component='img'
        src={require(`../../../assets/themeThumbnails/${theme}.jpg`)}
        className={styles.themeButton__img}
      />
    </Card>
  )
}
export default ThemeButton
