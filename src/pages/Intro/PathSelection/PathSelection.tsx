import { Box, Button, Typography, useTheme } from "@mui/material"
import styles from './PathSelection.module.scss'
import { useNavigate } from "react-router-dom"
import { ProfileRoutes } from "models"
import { useMainContext } from "src/layouts/Main/MainLayout"

export const PathSelection = (): JSX.Element => {
  const navigate = useNavigate()
  const { setMessage } = useMainContext()

  return <Box className={styles.container}>
    <Typography variant="h2">Choose what you want to do</Typography>
    <Button variant='contained'
      fullWidth
      onClick={() => {
        navigate(`/profile/${ProfileRoutes.BASIC_QUEST}`)
      }}>
        Find roommates
    </Button>
    <Button variant='outlined'
      fullWidth
      onClick={() => {
        setMessage({
          text: 'IDK where to navigate you yet',
          severity: 'info',
          life: 5000,
          visible: true
        })
      }}>
        Find apartments
    </Button>
    <Button variant='outlined'
      fullWidth
      onClick={() => {
        navigate(`/profile/${ProfileRoutes.MY_APARTMENT}`)
      }}>
        Rent apartment/room
    </Button>
  </Box>
}
