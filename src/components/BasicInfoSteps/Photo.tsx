import styles from './Photo.module.scss'
import { FormHelperText, IconButton, Typography, useTheme } from '@mui/material'
import { type ChangeEvent, useState } from 'react'
import { type NewUser } from '../../models/user'
import { ImageCropper } from '../ImageCropper/ImageCropper'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { UserCard } from 'components/UserCard/UserCard'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import { t } from '@lingui/macro'
import { useMainContext } from 'layouts/Main/MainLayout'
import { imageTypes } from 'utils/constants'
import { calculateAge } from 'utils/date-time'
import { photoReader } from 'utils/photoReader'

interface Props {
  user: NewUser
  photoChange: ({ profilePhoto, avatarPhoto }: { profilePhoto: string, avatarPhoto: string }) => void
}

const Photo = ({ user, photoChange }: Props): JSX.Element => {
  const theme = useTheme()
  const {
    setBackdropVisible,
    setBackdropMessage,
    setMessage
  } = useMainContext()
  const [imageSizeError, setImageSizeError] = useState(false)
  const [profileCropVisible, setProfileCropVisible] = useState(false)
  const [test, setTest] = useState('')
  const [avatarCropVisible, setAvatarCropVisible] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState('')

  const addPhoto = (): void => {
    document.getElementById('photo-upload')?.click()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if ((e.target.files != null)) {
      const oversize = (e.target.files[0].size / (1024 * 1024)) > 20
      setImageSizeError(oversize)
      if (!oversize) {
        void openCrop(e.target.files[0])
      }
    }
  }

  const openCrop = async (photo: File): Promise<void> => {
    const reader = await photoReader({ photo, setBackdropVisible, setBackdropMessage, setMessage })
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
          <small>{t`Up to 20 mb`}</small>
        </>}
        action={
          <IconButton sx={{ color: theme.palette.primary.main }} size='small' aria-label="edit" onClick={addPhoto}>
            <DriveFolderUploadIcon fontSize='small' />
            <Typography fontSize={14} marginLeft='0.5rem'>{t`Change`}</Typography>
          </IconButton>
        }></UserCard>

      {imageSizeError && <FormHelperText error={true}>{t`Up to 20MB files are allowed`}</FormHelperText>}

      {profileCropVisible && <ImageCropper title={t`Profile photo`}
        image={test}
        acceptButtonText={t`Confirm and pick avatar`}
        shape='high-rect'
        acceptImage={photo => {
          setProfilePhoto(photo)
          setProfileCropVisible(false)
          setAvatarCropVisible(true)
        }} />}

      {avatarCropVisible && <ImageCropper title={t`Avatar photo`}
        image={test}
        acceptButtonText={t`Confirm and proceed`}
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
