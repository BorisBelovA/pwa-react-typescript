import { Box, Button, Typography } from '@mui/material'
import styles from './PathSelection.module.scss'
import { useNavigate } from 'react-router-dom'
import { ProfileRoutes } from 'models'
import { t } from '@lingui/macro'

export const PathSelection = (): JSX.Element => {
  const navigate = useNavigate()

  return <Box className={styles.container}>
    <Typography variant='h2'>{t`For refugees`}</Typography>
    <Button variant='outlined'
      color='accent'
      fullWidth
      onClick={() => {
        navigate(`/profile/${ProfileRoutes.MY_APARTMENT}/new/basic?purpose=rent&status=refugee`)
      }}>
        {t`I have a place for refugees`}
    </Button>
    <Button variant='contained'
      color='accent'
      fullWidth
      onClick={() => {
        navigate('/apartment-search/filters?status=refugee')
      }}>
        {t`I am a refugee`}
    </Button>
    <Typography variant='h2'>{t`Choose what you want to do`}</Typography>
    <Button variant='contained'
      fullWidth
      onClick={() => {
        navigate(`/profile/${ProfileRoutes.BASIC_QUEST}`)
      }}>
        {t`Find roommates`}
    </Button>
    <Button variant='outlined'
      fullWidth
      onClick={() => {
        navigate('/apartment-search/filters')
      }}>
        {t`Find apartments`}
    </Button>
    <Button variant='outlined'
      fullWidth
      onClick={() => {
        navigate(`/profile/${ProfileRoutes.MY_APARTMENT}`)
      }}>
        {t`Rent out apartment/room`}
    </Button>
  </Box>
}
