import { Typography } from '@mui/material'
import styles from './Preview.module.scss'
import CardMyProfile from 'src/components/Cards/CardMyProfile/CardMyProfile'

const Preview = () => {
  return (
    <>
      <Typography variant='h1' className={styles.header}>Your profile</Typography>
      <CardMyProfile />
    </>
  )
}
export default Preview