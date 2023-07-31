import { Box, Button, ButtonBase, IconButton, Typography } from "@mui/material"
import { EmptyPersonalInfo, NewUser } from "models"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import About from "src/components/BasicInfoSteps/About"
import Phone from "src/components/BasicInfoSteps/Phone"
import Photo from "src/components/BasicInfoSteps/Photo"
import { useStore } from "src/utils/StoreProvider"
import styles from './BasicInfo.module.scss'
import SaveIcon from '@mui/icons-material/Save';
import { sessionService, userApiService } from "api-services"
import { mapBase64ToFile, mapUserToDto } from "mapping-services"
import { filesApiService } from "src/api/api-services/files"
import { useMainContext } from "src/layouts/Main/MainLayout"
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import { useNavigate } from "react-router-dom"

interface Props { }
const BasicInfo = (props: Props) => {
  const { userStore } = useStore()
  const navigate = useNavigate()
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

  const { control: control_phone, watch: watch_phone, formState: { isValid: isValid_phone } } = useForm<{ phone: string }>({
    defaultValues: {
      phone: userStore.phone ?? ''
    },
    mode: 'all'
  })

  useEffect(() => {
    const subscription = watch_phone(({ phone }) => {
      setUser({ ...user, phone })
    })
    return () => { subscription.unsubscribe() }
  }, [watch_phone])

  const onFinish = async (): Promise<void> => {
    setBackdropVisible(true)
    setBackdropMessage('Updating your information')
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
      throw new Error('User form is not filled!')
    }
    if (!sessionService.authToken) {
      throw new Error('No session token provided')
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
      const response = await userApiService.updateUser(mapUserToDto({
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
      setBackdropMessage('Finishing up!')
      setTimeout(() => {
        userStore.setUser({
          id: response.id,
          firstName,
          lastName,
          gender,
          birthday,
          phone: phone ?? null,
          photo: photo ?? null,
          avatar: avatar ?? null
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

  return (
    <Box className={styles.container}>
      <Box className={styles.header}>
        <IconButton onClick={() => { navigate(-1) }}>
          <ArrowBackIosNewRoundedIcon color='primary' />
        </IconButton>
        <Typography variant="h1" className={styles.header__text}>Basic information</Typography>
        <IconButton disabled={!(isValid && isValid_phone)} color="primary" onClick={onFinish}>
          <SaveIcon />
        </IconButton>
      </Box>
      <Box className={styles.content}>
        <Box className={styles.content__part}>
          <Typography variant="h2">Bio</Typography>
          <About errors={errors} control={control} register={register} user={user} />
        </Box>
        <Box className={styles.content__part}>
          <Typography variant="h2">Phone</Typography>
          <Phone control={control_phone} />
        </Box>
        <Box className={styles.content__part}>
          <Typography variant="h2">Photo</Typography>
          <Photo user={user} photoChange={({ profilePhoto, avatarPhoto }) => {
            setUser({ ...user, photo: profilePhoto, avatar: avatarPhoto })
          }} />
        </Box>
        <Box className={styles.content__part}>
          <Button onClick={onFinish} variant='contained'>Save</Button>
        </Box>
      </Box>
    </Box>
  )
}
export default BasicInfo