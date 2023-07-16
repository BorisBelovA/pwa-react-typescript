import { Box, Button } from '@mui/material'
import { Location, Outlet, useLocation, useNavigate, useOutletContext, useSearchParams } from 'react-router-dom'
import ProgressSlider from 'src/components/ProgressSlider/ProgressSlider'
import useProgressSlider, { type ProgressSliderSetActiveFunc, type ProgressSliderSetPercentFunc } from 'src/components/ProgressSlider/useProgressSlider'
import { type MainLayoutContext, useMainContext } from 'src/layouts/Main/MainLayout'
import styles from './AppartmentQuestionnaire.module.scss'
import { useEffect, useState } from 'react'
import {
  type Apartment,
  ApartmentsQuestionnaireRoutes,
  type NewApartmentForm,
  type ApartmentPurpose,
  ProfileRoutes,
  QuestionnaireRoutes,
  type Country,
  type District,
  type City
} from 'models'
import { mapBase64ToFile, mapApartmentToDto, mapPhotoNameToURI } from 'mapping-services'
import { filesApiService } from 'src/api/api-services/files'
import { apartmentService } from 'src/api/api-services/appartment'
import { useStore } from 'src/utils/StoreProvider'
import { type ProgressSliderProps } from 'src/components'

export type ApartmentQuestionnaireContext = MainLayoutContext & {
  apartment: Apartment
  lockLocation: boolean
  setApartment: React.Dispatch<React.SetStateAction<Apartment>>
  setNextDisabled: React.Dispatch<React.SetStateAction<boolean>>
  setActive: ProgressSliderSetActiveFunc
  setPercent: ProgressSliderSetPercentFunc
}

export const apartmentQuestionnaireContext = (): ApartmentQuestionnaireContext => {
  return useOutletContext<ApartmentQuestionnaireContext>()
}

const saveAllApartmentsPhotos = async (photos: string[]): Promise<string[]> => {
  const requests = photos.map(async (photo, index) => {
    const file = await mapBase64ToFile(photo, `${new Date().toISOString()}-${index}`)
    return await filesApiService.uploadFile(file, 'apartment')
  })
  return await Promise.all(requests)
}

const mapPurposeFromQueryParams = (purpose: string | null): ApartmentPurpose | null => {
  if (!purpose) {
    return null
  }
  if (purpose.toLowerCase() === 'rent') {
    return 'Rent'
  }
  if (purpose.toLowerCase() === 'questionnaire') {
    return 'Questionnaire'
  }
  return 'Other'
}

const getActiveStepFromURI = (location: Location): ApartmentsQuestionnaireRoutes => {
  const paths = location.pathname.split('/')
  const activeStep = paths[paths.length - 1]
  if (activeStep === undefined || activeStep === null || activeStep === '') {
    throw new Error('Unable to get active step from URI!')
  }
  if (![
    ApartmentsQuestionnaireRoutes.PURPOSE,
    ApartmentsQuestionnaireRoutes.BASIC,
    ApartmentsQuestionnaireRoutes.LOCATION,
    ApartmentsQuestionnaireRoutes.PHOTOS,
    ApartmentsQuestionnaireRoutes.ABOUT,
    ApartmentsQuestionnaireRoutes.SUMMARY
  ].includes(activeStep as ApartmentsQuestionnaireRoutes)) {
    throw new Error('Incorrect apartments questionnaire step!')
  }
  return activeStep as ApartmentsQuestionnaireRoutes
}

const questionnaireSteps: ProgressSliderProps[] = [
  { text: ApartmentsQuestionnaireRoutes.BASIC, progress: 0, to: ApartmentsQuestionnaireRoutes.BASIC },
  { text: ApartmentsQuestionnaireRoutes.LOCATION, progress: 0, to: ApartmentsQuestionnaireRoutes.LOCATION },
  { text: ApartmentsQuestionnaireRoutes.PHOTOS, progress: 0, to: ApartmentsQuestionnaireRoutes.PHOTOS },
  { text: ApartmentsQuestionnaireRoutes.ABOUT, progress: 0, to: ApartmentsQuestionnaireRoutes.ABOUT },
  { text: ApartmentsQuestionnaireRoutes.SUMMARY, progress: 0, to: ApartmentsQuestionnaireRoutes.SUMMARY }
]

export const ApartmentQuestionnaire = (): JSX.Element => {
  const [searchParams] = useSearchParams()

  const queryPurpose = mapPurposeFromQueryParams(searchParams.get('purpose'))
  const queryAppId = searchParams.get('id')

  const { items, setActive, completeStep, setPercent } = useProgressSlider({
    items: !!queryPurpose
      ? questionnaireSteps
      : [
          ...questionnaireSteps
        ]
  })

  const [nextBtnVisible, setNextBtnVisible] = useState(true)
  const [backBtnVisible, setBackBtnVisible] = useState(false)
  const [finishBtnVisible, setFinishBtnVisible] = useState(false)

  const { setBackdropVisible, setBackdropMessage, setMessage } = apartmentQuestionnaireContext()
  const { apartmentStore, questionnaireStore } = useStore()
  const [lockLocation, setLockLocation] = useState(false)

  let existingApartment: Apartment | undefined
  if (queryAppId) {
    existingApartment = apartmentStore.apartments.find(a => a.id === +queryAppId)
  }

  useEffect(() => {
    setLockLocation(!!existingApartment?.formId)
  }, [existingApartment])

  let initialLocation: {
    country: Country | undefined
    district: District | undefined
    city: City | undefined
    address: string | undefined
  } = {
    country: undefined,
    district: undefined,
    city: undefined,
    address: undefined
  }

  if (queryPurpose === 'Questionnaire') {
    const questionnaire = questionnaireStore.questionnaire
    if (questionnaire) {
      const { country, state, city } = questionnaire.location
      if (!!country && !!state && !!city) {
        initialLocation = {
          country, district: state, city, address: undefined
        }
      }
    }
  }

  useEffect(() => {
    setLockLocation(queryPurpose === 'Questionnaire')
  }, [])

  const navigate = useNavigate()
  const [apartment, setApartment] = useState<NewApartmentForm>({
    id: existingApartment?.id ?? null,
    name: existingApartment?.name ?? '',
    totalPrice: existingApartment?.totalPrice ?? null,
    currency: existingApartment?.currency ?? 'ILS',
    countRooms: existingApartment?.countRooms ?? 4,
    countAvailableRooms: existingApartment?.countAvailableRooms ?? 2,
    location: existingApartment
      ? existingApartment.location
      : initialLocation,
    photos: existingApartment?.photos ?? [],
    description: existingApartment?.description ?? '',
    purpose: existingApartment?.purpose
      ? existingApartment.purpose
      : queryPurpose,
    formId: existingApartment?.formId ?? null
  })

  const location = useLocation()
  const [nextDisabled, setNextDisabled] = useState(true)

  useEffect(() => {
    const activeStep = getActiveStepFromURI(location)
    setNextBtnVisible(activeStep !== ApartmentsQuestionnaireRoutes.SUMMARY)
    setBackBtnVisible(activeStep !== ApartmentsQuestionnaireRoutes.BASIC)
    setFinishBtnVisible(activeStep === ApartmentsQuestionnaireRoutes.SUMMARY)
  }, [location.pathname])

  const onNextStep = (): void => {
    const activeStep = getActiveStepFromURI(location)
    switch (activeStep) {
      case ApartmentsQuestionnaireRoutes.PURPOSE: {
        completeStep(ApartmentsQuestionnaireRoutes.PURPOSE)
        navigate(ApartmentsQuestionnaireRoutes.BASIC)
        break
      }
      case ApartmentsQuestionnaireRoutes.BASIC: {
        completeStep(ApartmentsQuestionnaireRoutes.BASIC)
        navigate(ApartmentsQuestionnaireRoutes.LOCATION)
        break
      }
      case ApartmentsQuestionnaireRoutes.LOCATION: {
        const stepProgress = items[1].progress
        if (stepProgress === 100) {
          completeStep(ApartmentsQuestionnaireRoutes.LOCATION)
        } else {
          setActive(ApartmentsQuestionnaireRoutes.PHOTOS)
        }
        navigate(ApartmentsQuestionnaireRoutes.PHOTOS)
        break
      }
      case ApartmentsQuestionnaireRoutes.PHOTOS: {
        completeStep(ApartmentsQuestionnaireRoutes.PHOTOS)
        navigate(ApartmentsQuestionnaireRoutes.ABOUT)
        break
      }
      case ApartmentsQuestionnaireRoutes.ABOUT: {
        completeStep(ApartmentsQuestionnaireRoutes.ABOUT)
        navigate(ApartmentsQuestionnaireRoutes.SUMMARY)
        break
      }
      default: {
        throw new Error('Unknown step to complete!')
      }
    }
  }

  const onPrevStep = (): void => {
    const activeStep = getActiveStepFromURI(location)
    switch (activeStep) {
      case ApartmentsQuestionnaireRoutes.BASIC: {
        navigate(ApartmentsQuestionnaireRoutes.PURPOSE)
        break
      }
      case ApartmentsQuestionnaireRoutes.LOCATION: {
        navigate(ApartmentsQuestionnaireRoutes.BASIC)
        break
      }
      case ApartmentsQuestionnaireRoutes.PHOTOS: {
        navigate(ApartmentsQuestionnaireRoutes.LOCATION)
        break
      }
      case ApartmentsQuestionnaireRoutes.ABOUT: {
        navigate(ApartmentsQuestionnaireRoutes.PHOTOS)
        break
      }
      case ApartmentsQuestionnaireRoutes.SUMMARY: {
        navigate(ApartmentsQuestionnaireRoutes.ABOUT)
        break
      }
      default: {
        throw new Error('Unknown step to complete!')
      }
    }
  }

  const linkApartmentToQuestionnaire = async (): Promise<void> => {
    setBackdropVisible(true)
    setBackdropMessage('Saving your apartment!')
    try {
      const photos = await saveAllApartmentsPhotos(apartment.photos)
      const dto = {
        ...apartment,
        photos: photos.map(p => mapPhotoNameToURI(p))
      }
      apartmentStore.linkApartmentToQuestionnaire(dto as Apartment)
      setBackdropVisible(false)
      navigate(`/profile/${ProfileRoutes.BASIC_QUEST}/${QuestionnaireRoutes.APARTMENT}`)
    } catch (e) {
      console.error(e)
      setBackdropVisible(false)
      setMessage({
        visible: true,
        text: (e as Error).message ?? 'Something went wrong',
        severity: 'error'
      })
    }
  }

  const saveApartment = async (apartment: Apartment): Promise<void> => {
    setBackdropVisible(true)
    setBackdropMessage('Saving your apartment!')
    const photos = await saveAllApartmentsPhotos(apartment.photos)
    const dto = mapApartmentToDto({
      ...apartment,
      photos: photos.map(p => mapPhotoNameToURI(p))
    })
    try {
      setBackdropMessage('Almost done!')
      const savedApartment = await apartmentService.addNewApartment(dto)
      setBackdropVisible(false)
      apartmentStore.setApartments([{
        ...apartment,
        id: savedApartment.id
      }])
      navigate('../../')
    } catch (e) {
      console.error(e)
      setBackdropVisible(false)
      setMessage({
        visible: true,
        text: (e as Error).message ?? 'Something went wrong',
        severity: 'error'
      })
    }
  }

  const updateApartment = async (apartment: Apartment): Promise<void> => {
    setBackdropVisible(true)
    setBackdropMessage('Updating your apartment!')
    const photos = await saveAllApartmentsPhotos(apartment.photos)
    const dto = mapApartmentToDto({
      ...apartment,
      photos: photos.map(p => mapPhotoNameToURI(p))
    })
    try {
      setBackdropMessage('Almost done!')
      const savedApartment = await apartmentService.updateApartment(dto)
      setBackdropVisible(false)
      apartmentStore.setApartments([{
        ...apartment,
        id: savedApartment.id
      }])
      navigate('../../')
    } catch (e) {
      console.error(e)
      setBackdropVisible(false)
      setMessage({
        visible: true,
        text: (e as Error).message ?? 'Something went wrong',
        severity: 'error'
      })
    }
  }

  const onFinish = (): void => {
    if (apartment.id === null) {
      if (apartment.purpose === 'Questionnaire') {
        linkApartmentToQuestionnaire()
      } else {
        void saveApartment(apartment as unknown as Apartment)
      }
    } else {
      void updateApartment(apartment as unknown as Apartment)
    }
  }

  return <>
    <ProgressSlider items={items} setActive={setActive} />
    <Box className={styles.container}>
      <Box className={styles.container_content}>
        <Outlet context={{
          setActive,
          setPercent,
          lockLocation,
          ...useMainContext(),
          apartment,
          setApartment,
          setNextDisabled
        }} />
      </Box>

      <Box className={styles.buttons_container}>
        <Box className={styles.buttons_container_column}>
          {backBtnVisible && <Button
            fullWidth
            variant='outlined'
            onClick={onPrevStep}>
            Back
          </Button>
          }
        </Box>
        {nextBtnVisible && <Button className={styles.buttons_container_column}
          fullWidth
          variant='contained'
          disabled={nextDisabled}
          onClick={onNextStep}>
          Next
        </Button>
        }
        {finishBtnVisible && <Button className={styles.buttons_container_column}
          fullWidth
          variant='contained'
          onClick={onFinish}>
          Finish
        </Button>
        }
      </Box>
    </Box>
  </>
}
