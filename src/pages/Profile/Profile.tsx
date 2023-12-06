import { observer } from 'mobx-react-lite'
import { Avatar, Box, IconButton, Typography, useTheme } from '@mui/material'
import { useStore } from 'utils/StoreProvider'
import styles from './Profile.module.scss'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import { type ChangeEvent, useState, useEffect } from 'react'
import { ImageCropper } from 'components/ImageCropper/ImageCropper'
import { ProfileRoutes } from 'models'
import { filesApiService } from 'api/api-services/files'
import { mapAuthenticatedUserData, mapBase64ToFile, mapPhotoNameToURI, mapUserToDto } from 'mapping-services'
import { sessionService, userApiService } from 'api-services'
import { imageTypes } from 'utils/constants'
import { useNavigate } from 'react-router-dom'

import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { t } from '@lingui/macro'
import { MyListItemButton } from 'components/ListItemButton/ListItemButton'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import { DonateDialog } from 'components/DonateDialog/DonateDialog'
import { Steps } from 'intro.js-react'
import introSteps from 'assets/data/intro-steps/profile'
import { defaultStepsOptions, stepsFactory } from 'assets/data/intro-steps/steps'
import FollowTheSignsOutlinedIcon from '@mui/icons-material/FollowTheSignsOutlined'

const Profile: React.FunctionComponent = observer(() => {
  const { userStore, questionnaireStore, themeStore, walkthroughStore } = useStore()

  const [cropVisible, setCropVisible] = useState(false)
  const [image, setImage] = useState('')
  const navigate = useNavigate()
  const [donateVisible, setDonateVisible] = useState(false)

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

  const saveAvatar = async (avatar: string): Promise<void> => {
    if (!sessionService.authToken) {
      throw new Error(t({ message: 'Can\'t save without session token' }))
    }
    const file = await mapBase64ToFile(avatar, 'avatar')
    const avatarName = await filesApiService.uploadFile(file, 'avatar')
    await userApiService.updateUser(mapUserToDto({
      ...userStore.user,
      avatar: avatarName
    }),
    sessionService.authToken
    )
    userStore.setAvatar(mapPhotoNameToURI(avatarName))
  }

  const theme = useTheme()

  const getQuestionnaire = async (): Promise<void> => {
    await questionnaireStore.getQuestionnaire()
  }

  useEffect(() => {
    const getUserData = async (token: string): Promise<void> => {
      try {
        const userInfo = await userApiService.getAuthenticatedUser(token)
        const [user] = mapAuthenticatedUserData(userInfo)
        userStore.setUser(user)
      } catch (error) {
        console.log(error)
      }
    }

    if (sessionService.authToken) {
      void getUserData(sessionService.authToken)
    }

    if (!questionnaireStore.questionnaire?.id) {
      void getQuestionnaire()
    }
  }, [])

  const steps = stepsFactory(introSteps, themeStore.theme)

  return <>
    <Steps
      enabled={walkthroughStore.walkthroughVisible}
      steps={steps}
      initialStep={0}
      options={{
        ...defaultStepsOptions,
        doneLabel: 'Go to Apartments'
      }}
      onComplete={() => {
        navigate('/apartment-search')
      }}
      onExit={(stepIndex) => {
        if (stepIndex !== steps.length && stepIndex !== -1) {
          walkthroughStore.finishWalkthrough()
        }
      }}
    />
    <Box className={styles.profile_container}>
      <Box className={styles.profile_user_info_container}>
        <Box className={styles.profile_user_info_avatar}
          onClick={() => { navigate(`/profile/${ProfileRoutes.ABOUT_ME}/${ProfileRoutes.PREVIEW}`) }}
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
          <IconButton
            data-intro-id='profile-my-profile-view'
            size='small' sx={{
              color: 'white',
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.main
              }
            }}
            className={styles.change_avatar} aria-label="delete"
          >
            <RemoveRedEyeIcon />
          </IconButton>
        </Box>
        <Typography variant='h2'>{userStore.firstName && ` ${userStore.firstName} ${userStore.lastName}`}</Typography>
      </Box>
      <Box className={styles.profile_items_container}>
        <MyListItemButton data-intro-id='profile-about-me'
          label={t({ message: 'About me' })}
          icon={TextSnippetOutlinedIcon}
          action={() => { navigate(`/profile/${ProfileRoutes.ABOUT_ME}`) }}
        />
        <MyListItemButton data-intro-id='profile-my-apartments'
          label={t({ message: 'My apartments' })}
          icon={ChairOutlinedIcon}
          action={() => { navigate(`/profile/${ProfileRoutes.MY_APARTMENT}`) }}
        />

        <MyListItemButton data-intro-id='profile-settings'
          label={t({ message: 'Settings' })}
          icon={SettingsOutlinedIcon}
          action={() => { navigate(`/profile/${ProfileRoutes.SETTINGS}`) }}
        />

        <MyListItemButton data-intro-id='profile-donate'
          label={t({ message: 'Donate' })}
          icon={MonetizationOnOutlinedIcon}
          action={() => { setDonateVisible(true) }}
        />

        <MyListItemButton label={t({ message: 'Walkthrough' })}
          icon={FollowTheSignsOutlinedIcon}
          action={() => { walkthroughStore.startWalkthrough() }}
        />
      </Box>
    </Box>

    {cropVisible && <ImageCropper title={t({ message: 'Select photo' })}
      image={image}
      acceptButtonText={t({ message: 'Accept' })}
      shape='round'
      acceptImage={photo => {
        setCropVisible(false)
        void saveAvatar(photo);
        (document.getElementById('photo-upload') as HTMLInputElement).value = ''
      }}
    />}

    <input id='photo-upload'
      className={styles.hiddenInput}
      type="file"
      accept={imageTypes}
      name=""
      onChange={handleFileChange}
    />

    <DonateDialog visible={donateVisible} setVisible={setDonateVisible} />
  </>
})

export default Profile
