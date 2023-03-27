import { Button } from '@mui/material'
import moment from 'moment'
import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { type NewUser, type UserForm } from '../../models/user'
import { FifthStep } from './Fifth step/FifthStep'
import { FirstStep } from './First step/FirstStep'
import { ForthStep } from './Forth-Step/ForthStep'
import styles from './Layout.module.scss'
import { SecondStep } from './Second step/SecondStep'
import { ThirdStep } from './Third step/ThirdStep'
import { UserCreationLoader } from './UserCreationLoader/UserCreationLoader'
import { userApiService } from 'api-services'
import { mapUserFormToDto } from 'mapping-services'
import { useStore } from 'src/utils/StoreProvider'
import ProgressSlider from 'src/components/ProgressSlider/ProgressSlider'
import useProgressSlider from 'src/components/ProgressSlider/useProgressSlider'
import { type ProgressSliderProps } from 'src/components'

export type RegistrationSteps = 'personal' | 'phone' | 'verification' | 'photo' | 'summary'

const steps: ProgressSliderProps[] = [
  { text: 'personal', progress: 0, to: 'personal', state: 'Active' },
  { text: 'phone', progress: 0, to: 'phone', state: 'Disabled' },
  { text: 'verification', progress: 0, to: 'verification', state: 'Disabled' },
  { text: 'photo', progress: 0, to: 'photo', state: 'Disabled' },
  { text: 'summary', progress: 0, to: 'summary', state: 'Disabled' }
]

export const Layout = (): JSX.Element => {
  const [firstStepValid, setFirstStepValid] = useState(false)
  const [secondStepValid, setSecondStepValid] = useState(false)
  const { email, password } = useLocation().state
  const [userProgressVisible, setUserProgressVisible] = useState(false)
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
      throw new Error('something wrong with steps!')
    }
    return step.text as RegistrationSteps
  }, [items])

  const nextBtnDisabled = useMemo(() => {
    return (activeStep === 'personal' && !firstStepValid) ||
      (activeStep === 'phone' && !secondStepValid)
  }, [activeStep, firstStepValid, secondStepValid])

  const { userStore } = useStore()

  const [loadinMessage, setLoadinMessage] = useState('Creating your account')

  const onFinish = (): void => {
    setUserProgressVisible(true)
    setLoadinMessage('Creating your account')
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
      throw new Error('User form is not filled!')
    }

    userApiService.createUser(mapUserFormToDto({
      email,
      password,
      firstName,
      lastName,
      gender,
      birthday,
      phone: phone ?? null,
      avatar: avatar ?? null,
      photo: photo ?? null
    })).then(
      (response) => {
        setLoadinMessage('Acquiring your token')
        // new request for activating user
        // we wait until backend guys fix that
        setTimeout(() => {
          userStore.setUser({
            email,
            password,
            firstName,
            lastName,
            gender,
            birthday,
            phone: phone ?? null,
            photo: photo ?? null,
            avatar: avatar ?? null
          })
          setUserProgressVisible(false)
          navigate('/profile')
        }, 2000)
      },
      (error) => {
        console.error(error)
        setUserProgressVisible(false)
      }
    )
  }

  const isUser = (user: NewUser): user is UserForm => {
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
      {activeStep === 'verification' && <ThirdStep />}
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
          <Button fullWidth variant='outlined' onClick={() => { completeStep(activeStep) }}>Skip</Button>
        }
      </div>
      <div className={styles.buttonsСontainerСolumn}>
        {
          activeStep !== 'summary' &&
          <Button fullWidth
            variant='contained'
            disabled={nextBtnDisabled}
            onClick={() => { completeStep(activeStep) }}>
            Next
          </Button>
        }
        {
          activeStep === 'summary' &&
          <Button fullWidth
            variant='contained'
            onClick={onFinish}>
            Create Account
          </Button>
        }
      </div>
    </div>
    {
      userProgressVisible &&
      <UserCreationLoader message={loadinMessage}></UserCreationLoader>
    }
  </div >
}
