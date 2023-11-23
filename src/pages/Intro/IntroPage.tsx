import { Box, useTheme } from '@mui/material'
import { Outlet } from 'react-router-dom'
import styles from './IntroPage.module.scss'
import { useMainContext } from 'layouts/Main/MainLayout'

export const IntroPage = (): JSX.Element => {
  const mainLayoutContext = useMainContext()
  const theme = useTheme()
  return <Box className={styles.container}
    sx={{ backgroundColor: theme.palette.background.default }}>
    <Outlet context={mainLayoutContext}></Outlet>
  </Box>
}
