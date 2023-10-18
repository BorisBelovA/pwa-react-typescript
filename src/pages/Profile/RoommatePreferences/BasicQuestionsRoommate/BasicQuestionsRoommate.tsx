import { Box, Typography } from '@mui/material'
import styles from '../../Profile.module.scss'
import BackButton from 'components/Buttons/BackButton/BackButton'

const BasicQuestionsRoommate = (): JSX.Element => {
  return (
    <Box className={styles.profile__container}>
      <Box className={styles.profile__header}>
        <BackButton />
        <Typography variant='h1'>Basic questions</Typography>
      </Box>
    </Box>
  )
}
export default BasicQuestionsRoommate
