import { observer } from 'mobx-react-lite'
import { Avatar, Box, IconButton, Typography, useTheme } from '@mui/material'
import { useStore } from 'src/utils/StoreProvider'
import styles from './Profile.module.scss'
import SettingsNavigationButton from 'src/components/navigation/SettingsNavigationButton/SettingsNavigationButton'
import EditIcon from '@mui/icons-material/Edit';
import { ChangeEvent, useState } from 'react'
import { ImageCropper } from 'src/components/ImageCropper/ImageCropper'
import { ProfileRoutes } from 'models'
const Profile: React.FunctionComponent = observer(() => {
  const { userStore } = useStore()

  const [cropVisible, setCropVisible] = useState(false)
  const [image, setImage] = useState('')

  const pickAvatar = (): void => {
    document.getElementById('photo-upload')?.click()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if ((e.target.files != null)) {
      const oversize = (e.target.files[0].size / (1024 * 1024)) > 20
      if (!oversize) {
        openCrop(e.target.files[0])
      }
    }
  }

  const openCrop = (photo: File): void => {
    const reader = photoReader(photo)
    reader.onloadend = () => {
      setImage(reader.result as string)
      setCropVisible(true)
    }
  }

  const photoReader = (photo: File): FileReader => {
    const reader = new FileReader()
    reader.readAsDataURL(photo)
    return reader
  }

  const theme = useTheme()
  return <>
    <Box className={styles.profile_container}>
      <Box className={styles.profile_user_info_container}>
        <Box className={styles.profile_user_info_avatar}
          sx={{
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: '100%'
          }}>
          <Avatar alt={`${userStore.firstName ?? ''} ${userStore.lastName ?? ''}`}
            src={userStore.avatar ?? ''}
            sx={{
              width: 82,
              height: 82,
              border: `2px solid ${theme.palette.background.default}`
            }}>
          </Avatar>
          <IconButton size='small' sx={{
            color: 'white',
            backgroundColor: theme.palette.primary.main,
            ':hover': {
              backgroundColor: theme.palette.primary.main
            }
          }}
            className={styles.change_avatar} aria-label="delete"
            onClick={pickAvatar}>
            <EditIcon />
          </IconButton>
        </Box>
        <Typography variant='h2'>{userStore.firstName && ` ${userStore.firstName} ${userStore.lastName}`}</Typography>
      </Box>
      <Box className={styles.profile_items_container}>
        <SettingsNavigationButton to={`/profile/${ProfileRoutes.ABOUT_ME}`}>About me</SettingsNavigationButton>
        <SettingsNavigationButton to={`/profile/${ProfileRoutes.ROOMMATE_PREFERENCES}`}>Roommate preferences</SettingsNavigationButton>
        <SettingsNavigationButton to={`/profile/${ProfileRoutes.MY_APPARTMENT}`}>My appartments</SettingsNavigationButton>
        <SettingsNavigationButton to={`/profile/${ProfileRoutes.SETTINGS}`}>Settings</SettingsNavigationButton>
        <SettingsNavigationButton to={`/profile/${ProfileRoutes.BASIC_QUEST}`}>Test Questionnaire</SettingsNavigationButton>
        <SettingsNavigationButton to=''>Logout</SettingsNavigationButton>
      </Box>
    </Box>

    {cropVisible && <ImageCropper title='Select photo'
        image={image}
        acceptButtonText='Accept'
        shape='round'
        acceptImage={photo => {
          setCropVisible(false)
          userStore.setAvatar(photo);
          (document.getElementById('photo-upload') as HTMLInputElement).value = ''
        }}
      />}

      <input id='photo-upload'
        className={styles.hiddenInput}
        type="file"
        accept='.jpeg,.jpg,.png'
        name=""
        onChange={handleFileChange}
      />
  </>
})

export default Profile
