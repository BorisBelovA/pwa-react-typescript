import { Box, Button, Typography } from '@mui/material'
import styles from './PathSelection.module.scss'
import { useNavigate } from 'react-router-dom'
import { ProfileRoutes } from 'models'
import { useMainContext } from 'src/layouts/Main/MainLayout'

export const PathSelection = (): JSX.Element => {
  const navigate = useNavigate()

  return <Box className={styles.container}>
    <Typography variant='h2'>For refugees</Typography>
    <Button variant='outlined'
      color='accent'
      fullWidth
      onClick={() => {
        navigate(`/profile/${ProfileRoutes.MY_APARTMENT}/new/basic?purpose=rent&status=refugee`)
      }}>
        I have a place for refugees
    </Button>
    <Button variant='contained'
      color='accent'
      fullWidth
      onClick={() => {
        navigate(`/apartment-search?status=refugee`)
      }}>
        I am a refugee
    </Button>
    <Typography variant='h2'>Choose what you want to do</Typography>
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
        navigate(`/apartment-search`)
      }}>
        Find apartments
    </Button>
    <Button variant='outlined'
      fullWidth
      onClick={() => {
        navigate(`/profile/${ProfileRoutes.MY_APARTMENT}`)
      }}>
        Rent out apartment/room
    </Button>
  </Box>
}
