import styles from './ForthStep.module.scss'
import { FormHelperText, IconButton, Typography, useTheme } from '@mui/material'
import { type ChangeEvent, useState } from 'react'
import { type NewUser } from '../../../models/user'
import { ImageCropper } from '../../../components/ImageCropper/ImageCropper'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { UserCard } from 'src/components/UserCard/UserCard'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import { calculateAge } from 'src/utils/date-time'
import { imageTypes } from 'src/utils/constants'
import Photo from 'src/components/BasicInfoSteps/Photo'

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
