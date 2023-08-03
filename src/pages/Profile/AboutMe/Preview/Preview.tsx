import { Box, Typography } from '@mui/material'
import commonStyles from '../../Profile.module.scss'
import CardMyProfile from 'src/components/Cards/CardMyProfile/CardMyProfile'
import BackButton from 'src/components/Buttons/BackButton/BackButton'

const Preview = () => {
  return (
    <>
      <Box className={commonStyles.profile__header}>
        <BackButton />
        <Typography variant='h1'>Your profile</Typography>
      </Box>
      <CardMyProfile />
    </>
  )
}
export default Preview