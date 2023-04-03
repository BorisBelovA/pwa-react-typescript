import { Box, Card, PaletteMode, Paper, Typography } from '@mui/material'
import { useStore } from 'src/utils/StoreProvider'
import styles from './ThemeButton.module.scss'

interface Props {
  theme: PaletteMode
  text: string
  image: string
}

const ThemeButton = (props: Props) => {
  const { themeStore } = useStore()
  return (
    <Card className={styles.themeButton} onClick={() => { themeStore.setTheme(props.theme) }}>
      <Typography variant='h2'>{props.text}</Typography>
      <Box 
      component='img' 
      src={require(`../../../assets/themeThumbnails/${props.theme}.jpg`)} 
      className={styles.themeButton__img} 
      />
    </Card>
  )
}
export default ThemeButton
