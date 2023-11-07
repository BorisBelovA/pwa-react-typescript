import { Button } from '@mui/material'
import moment from 'moment'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type User, type NewUser } from '../../models/user'
import { FifthStep } from './Fifth step/FifthStep'
import { FirstStep } from './First step/FirstStep'
import { ForthStep } from './Forth-Step/ForthStep'
import styles from './Layout.module.scss'
import { SecondStep } from './Second step/SecondStep'
import { sessionService, userApiService } from 'api-services'
import { mapBase64ToFile, mapPhotoNameToURI, mapUserToDto } from 'mapping-services'
import { useStore } from 'src/utils/StoreProvider'
import ProgressSlider from 'src/components/ProgressSlider/ProgressSlider'
import useProgressSlider from 'src/components/ProgressSlider/useProgressSlider'
import { type ProgressSliderProps } from 'src/components'
import { useAuthContext } from 'src/layouts/Auth/AuthLayout'
import { filesApiService } from 'src/api/api-services/files'
import { IntroRoutes } from 'models'
import { t } from '@lingui/macro'

export type RegistrationSteps = 'personal' | 'phone' | 'verification' | 'photo' | 'summary'

const steps: ProgressSliderProps[] = [
  { text: t`personal`, progress: 0, to: 'personal', state: 'Active' },
  { text: t`phone`, progress: 0, to: 'phone', state: 'Disabled' },
  { text: t`photo`, progress: 0, to: 'photo', state: 'Disabled' },
  { text: t`summary`, progress: 0, to: 'summary', state: 'Disabled' }
]

export const Layout = (): JSX.Element => {
  const [firstStepValid, setFirstStepValid] = useState(false)
  const [secondStepValid, setSecondStepValid] = useState(false)
  const {
    setBackdropMessage,
    setBackdropVisible,
    setMessage
  } = useAuthContext()
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    firstName: undefined,
    lastName: undefined,
    gender: 'M',
    birthday: moment(new Date()).subtract({ years: 18 }).toDate(),
    phone: undefined,
    photo: undefined,
    avatar: undefined
  } as NewUser)

  const { items, completeStep, setActive } = useProgressSlider({ items: steps })

  const activeStep: RegistrationSteps = useMemo(() => {
    const step = items.find(i => i.state === 'Active')
    if (step === undefined) {
      throw new Error(t`something wrong with steps!`)
    }
    return step.text as RegistrationSteps
  }, [items])

  const nextBtnDisabled = useMemo(() => {
    return (activeStep === 'personal' && !firstStepValid) ||
      (activeStep === 'phone' && !secondStepValid)
  }, [activeStep, firstStepValid, secondStepValid])

  const { userStore } = useStore()

  const onFinish = async (): Promise<void> => {
    setBackdropVisible(true)
    setBackdropMessage(t`Creating your account`)
    const {
      firstName,
      lastName,
      gender,
      birthday,
      phone,
      photo,
      avatar
    } = userInfo

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
        navigate(IntroRoutes.pathSelection)
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

  const isUser = (user: NewUser): user is User => {
    return user.firstName !== undefined &&
      user.lastName !== undefined &&
      user.birthday !== undefined &&
      user.gender !== undefined
  }

  return <div className={styles.registerationLayout}>
    <ProgressSlider items={items} useLinks={false} setActive={setActive} />
    <div className={styles.layoutContent}>
      {activeStep === 'personal' && <FirstStep user={userInfo}
        stepValid={setFirstStepValid}
        userInfoChange={(updatedUserInfo: Partial<NewUser>) => {
          setUserInfo({ ...userInfo, ...updatedUserInfo })
        }} />}
      {activeStep === 'phone' && <SecondStep user={userInfo}
        stepValid={setSecondStepValid}
        phoneChanged={(phone) => { setUserInfo({ ...userInfo, phone }) }}
      />}
      {activeStep === 'photo' && <ForthStep user={userInfo}
        photoChange={({ profilePhoto, avatarPhoto }) => {
          setUserInfo({ ...userInfo, photo: profilePhoto, avatar: avatarPhoto })
        }} />
      }
      {(activeStep === 'summary' && isUser(userInfo)) && <FifthStep
        user={userInfo}
        onEditStep={(step) => { setActive(step) }} />}
    </div>
    <div className={styles.buttonsContainer}>
      <div className={styles.buttonsСontainerСolumn}>
        {
          (activeStep === 'phone' || activeStep === 'verification') &&
          <Button fullWidth variant='outlined' onClick={() => { completeStep(activeStep) }}>{t`Skip`}</Button>
        }
      </div>
      <div className={styles.buttonsСontainerСolumn}>
        {
          activeStep !== 'summary' &&
          <Button fullWidth
            variant='contained'
            disabled={nextBtnDisabled}
            onClick={() => { completeStep(activeStep) }}>
            {t`Next`}
          </Button>
        }
        {
          activeStep === 'summary' &&
          <Button fullWidth
            variant='contained'
            onClick={() => { void onFinish() }}>
            {t`Create Account`}
          </Button>
        }
      </div>
    </div>
  </div >
}
