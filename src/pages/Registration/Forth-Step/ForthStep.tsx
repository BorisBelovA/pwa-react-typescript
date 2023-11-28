import styles from './ForthStep.module.scss'
import { Typography } from '@mui/material'
import { type NewUser } from '../../../models/user'
import Photo from 'components/BasicInfoSteps/Photo'

export interface ForthStepProps {
  user: NewUser
  photoChange: ({ profilePhoto, avatarPhoto }: { profilePhoto: string, avatarPhoto: string }) => void
}

export const ForthStep = ({ user, photoChange }: ForthStepProps): JSX.Element => {
  return <div className={styles.container}>
    <Typography variant='h1' >Upload a photo</Typography>
    <Photo user={user} photoChange={photoChange} />
  </div>
}
