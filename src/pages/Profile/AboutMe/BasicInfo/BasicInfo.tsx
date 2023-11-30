import { Box, Button, IconButton, Typography } from '@mui/material'
import { type EmptyPersonalInfo, type NewUser } from 'models'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import About from 'components/BasicInfoSteps/About'
import Phone from 'components/BasicInfoSteps/Phone'
import Photo from 'components/BasicInfoSteps/Photo'
import { useStore } from 'utils/StoreProvider'
import styles from './BasicInfo.module.scss'
import commonStyles from '../../Profile.module.scss'
import SaveIcon from '@mui/icons-material/Save'
import { sessionService, userApiService } from 'api-services'
import { mapBase64ToFile, mapPhotoNameToURI, mapUserToDto } from 'mapping-services'
import { filesApiService } from 'api/api-services/files'
import { useMainContext } from 'layouts/Main/MainLayout'
import BackButton from 'components/Buttons/BackButton/BackButton'
import { Trans, t } from '@lingui/macro'

const BasicInfo = (): JSX.Element => {
  const { userStore } = useStore()
  const [user, setUser] = useState({ ...userStore } as NewUser)
  const {
    setBackdropVisible,
    setBackdropMessage,
    setMessage
  } = useMainContext()

  const { register, control, watch, formState: { errors, isValid } } = useForm<EmptyPersonalInfo>({
    defaultValues: {
      firstName: userStore.firstName,
      lastName: userStore.lastName,
      gender: userStore.gender,
      birthday: userStore.birthday
    },
    mode: 'all'
  })

  useEffect(() => {
    const subss = watch(({ firstName, lastName, gender, birthday }) => {
      setUser({ ...user, firstName, lastName, gender, birthday })
    })
    return () => { subss.unsubscribe() }
  }, [watch, errors])

  const { control: controlPhone, watch: watchPhone, formState: { isValid: isValidPhone } } = useForm<{ phone: string }>({
    defaultValues: {
      phone: userStore.phone ?? ''
    },
    mode: 'all'
  })

  useEffect(() => {
    const subscription = watchPhone(({ phone }) => {
      setUser({ ...user, phone })
    })
    return () => { subscription.unsubscribe() }
  }, [watchPhone])

  const onFinish = async (): Promise<void> => {
    setBackdropVisible(true)
    setBackdropMessage(t`Updating your information`)
    const {
      firstName,
      lastName,
      gender,
      birthday,
      phone,
      photo,
      avatar
    } = user

    if ((firstName == null) || (lastName == null) || (gender === undefined) || (birthday == null)) {
      throw new Error(t`User form is not filled!`)
    }
    if (!sessionService.authToken) {
      throw new Error(t`No session token provided`)
    }
    try {
      let avatarName: string | null = null
      let photoName: string | null = null
      if (avatar) {
        const file = await mapBase64ToFile(avatar, `${new Date().toISOString()}`)
        avatarName = await filesApiService.uploadFile(file, 'avatar')
      }
      if (photo) {
        const file = await mapBase64ToFile(photo, `${new Date().toISOString()}`)
        photoName = await filesApiService.uploadFile(file, 'photo')
      }
      await userApiService.updateUser(mapUserToDto({
        id: userStore.id,
        firstName,
        lastName,
        gender,
        birthday,
        phone: phone ?? null,
        avatar: avatarName,
        photo: photoName
      }),
      sessionService.authToken
      )
      setBackdropMessage(t`Finishing up!`)
      setTimeout(() => {
        userStore.setUser({
          id: userStore.id,
          firstName,
          lastName,
          gender,
          birthday,
          phone: phone ?? null,
          photo: mapPhotoNameToURI(photoName ?? '') ?? null,
          avatar: mapPhotoNameToURI(avatarName ?? '') ?? null
        })
        setBackdropVisible(false)
      }, 2000)
    } catch (error: any) {
      console.error(error)
      setBackdropVisible(false)
      setMessage({
        visible: true,
        text: error.message,
        severity: 'error'
      })
    }
  }

  const formValid = useMemo(() => {
    return isValid && isValidPhone
  }, [isValid, isValidPhone])

  return (
    <Box className={styles.container}>
      <Box className={commonStyles.profile__header}>
        <BackButton />
        <Typography variant='h1' className={styles.header__text}>
          <Trans>Basic information</Trans>
        </Typography>
        <IconButton disabled={!formValid} color='primary' onClick={() => { void onFinish() }}>
          <SaveIcon />
        </IconButton>
      </Box>
      <Box className={styles.content}>
        <Box className={styles.content__part}>
          <Typography variant='h2'>
            <Trans>Bio</Trans>
          </Typography>
          <About errors={errors} control={control} register={register} user={user} />
        </Box>
        <Box className={styles.content__part}>
          <Typography variant='h2'>
            <Trans>Phone</Trans>
          </Typography>
          <Phone control={controlPhone} />
        </Box>
        <Box className={styles.content__part}>
          <Typography variant='h2'>
            <Trans>Photo</Trans>
          </Typography>
          <Photo user={user} photoChange={({ profilePhoto, avatarPhoto }) => {
            setUser({ ...user, photo: profilePhoto, avatar: avatarPhoto })
          }} />
        </Box>
        <Box className={styles.content__part}>
          <Button onClick={() => { void onFinish() }} disabled={!formValid} variant='contained' disableElevation>
            <Trans>Save</Trans>
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
export default BasicInfo
