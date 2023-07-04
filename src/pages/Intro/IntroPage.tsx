import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import styles from './IntroPage.module.scss'
import { useMainContext } from "src/layouts/Main/MainLayout"

export const IntroPage = (): JSX.Element => {
  const mainLayoutContext = useMainContext()
  return <Box className={styles.container}>
    <Outlet context={mainLayoutContext}></Outlet>
  </Box>
}
