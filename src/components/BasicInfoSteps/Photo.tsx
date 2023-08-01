import styles from './Photo.module.scss'
import { FormHelperText, IconButton, Typography, useTheme } from '@mui/material'
import { type ChangeEvent, useState } from 'react'
import { type NewUser } from '../../models/user'
import { ImageCropper } from '../ImageCropper/ImageCropper'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { UserCard } from 'src/components/UserCard/UserCard'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import { calculateAge } from 'src/utils/date-time'
import { imageTypes } from 'src/utils/constants'

interface Props {
  user: NewUser,
  photoChange: ({ profilePhoto, avatarPhoto }: { profilePhoto: string, avatarPhoto: string }) => void
}

const Photo = ({ user, photoChange }: Props) => {
  const theme = useTheme()
  const [imageSizeError, setImageSizeError] = useState(false)
  const [profileCropVisible, setProfileCropVisible] = useState(false)
  const [test, setTest] = useState('')
  const [avatarCropVisible, setAvatarCropVisible] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState('')

  const addPhoto = (): void => {
    document.getElementById('photo-upload')?.click()
  }

  const photoReader = (photo: File): FileReader => {
    const reader = new FileReader()
    reader.readAsDataURL(photo)
    return reader
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if ((e.target.files != null)) {
      const oversize = (e.target.files[0].size / (1024 * 1024)) > 20
      setImageSizeError(oversize)
      if (!oversize) {
        openCrop(e.target.files[0])
      }
    }
  }

  const openCrop = (photo: File): void => {
    const reader = photoReader(photo)
    reader.onloadend = () => {
      setTest(reader.result as string)
      setProfileCropVisible(true)
    }
  }

  return (
    <>
      <UserCard className={!user.photo ? styles.no_image : ''} image={user.photo}
        name={user.firstName ?? ''}
        age={user.birthday !== undefined ? calculateAge(user.birthday) : undefined}
        noImageComponent={<>
          <UploadFileIcon sx={{ fontSize: 80 }} onClick={addPhoto} />
          <small>Up to 20 mb</small>
        </>}
        action={
          <IconButton sx={{ color: theme.palette.primary.main }} size='small' aria-label="edit" onClick={addPhoto}>
            <DriveFolderUploadIcon fontSize='small' />
            <Typography fontSize={14} marginLeft='0.5rem'>Change</Typography>
          </IconButton>
        }></UserCard>

      {imageSizeError && <FormHelperText error={true}>Up to 20MB files are allowed</FormHelperText>}

      {profileCropVisible && <ImageCropper title='Profile photo'
        image={test}
        acceptButtonText='Confirm and pick avatar'
        shape='high-rect'
        acceptImage={photo => {
          setProfilePhoto(photo)
          setProfileCropVisible(false)
          setAvatarCropVisible(true)
        }} />}

      {avatarCropVisible && <ImageCropper title='Avatar photo'
        image={test}
        acceptButtonText='Confirm and proceed'
        shape='round'
        acceptImage={photo => {
          setAvatarCropVisible(false)
          photoChange({ profilePhoto, avatarPhoto: photo });
          (document.getElementById('photo-upload') as HTMLInputElement).value = ''
        }} />}

      <input id='photo-upload'
        className={styles.hiddenInput}
        type="file"
        accept={imageTypes}
        name=""
        onChange={handleFileChange}
      />
    </>
  )
}
export default Photo