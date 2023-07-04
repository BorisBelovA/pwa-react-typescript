import { Box, Button } from '@mui/material'
import { Outlet, useLocation, useNavigate, useOutletContext, useSearchParams } from 'react-router-dom'
import ProgressSlider from 'src/components/ProgressSlider/ProgressSlider'
import useProgressSlider, { type ProgressSliderSetActiveFunc, type ProgressSliderSetPercentFunc } from 'src/components/ProgressSlider/useProgressSlider'
import { type MainLayoutContext, useMainContext } from 'src/layouts/Main/MainLayout'
import styles from './AppartmentQuestionnaire.module.scss'
import { useEffect, useState } from 'react'
import { type Apartment, ApartmentsQuestionnaireRoutes, type NewApartmentForm } from 'models'
import { mapBase64ToFile, mapApartmentToDto } from 'mapping-services'
import { filesApiService } from 'src/api/api-services/files'
import { apartmentService } from 'src/api/api-services/appartment'
import { useStore } from 'src/utils/StoreProvider'

export type ApartmentQuestionnaireContext = MainLayoutContext & {
  apartment: Apartment
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

export const ApartmentQuestionnaire = (): JSX.Element => {
  const { items, setActive, completeStep, setPercent } = useProgressSlider({
    items: [
      { text: ApartmentsQuestionnaireRoutes.BASIC, progress: 0, to: ApartmentsQuestionnaireRoutes.BASIC },
      { text: ApartmentsQuestionnaireRoutes.LOCATION, progress: 0, to: ApartmentsQuestionnaireRoutes.LOCATION },
      { text: ApartmentsQuestionnaireRoutes.PHOTOS, progress: 0, to: ApartmentsQuestionnaireRoutes.PHOTOS },
      { text: ApartmentsQuestionnaireRoutes.ABOUT, progress: 0, to: ApartmentsQuestionnaireRoutes.ABOUT },
      { text: ApartmentsQuestionnaireRoutes.SUMMARY, progress: 0, to: ApartmentsQuestionnaireRoutes.SUMMARY }
    ]
  })

  const [nextBtnVisible, setNextBtnVisible] = useState(true)
  const [backBtnVisible, setBackBtnVisible] = useState(false)
  const [finishBtnVisible, setFinishBtnVisible] = useState(false)

  const { setBackdropVisible, setBackdropMessage, setMessage } = apartmentQuestionnaireContext()
  const { apartmentStore } = useStore()

  const [searchParams] = useSearchParams()

  let existingApartment: Apartment | undefined
  const queryAppId = searchParams.get('id')
  if (queryAppId) {
    existingApartment = apartmentStore.apartments.find(a => a.id === +queryAppId)
  }

  const navigate = useNavigate()
  const [apartment, setApartment] = useState<NewApartmentForm>({
    id: existingApartment?.id ?? 0,
    name: existingApartment?.name ?? '',
    totalPrice: existingApartment?.totalPrice ?? null,
    currency: existingApartment?.currency ?? 'ILS',
    countRooms: existingApartment?.countRooms ?? 4,
    countAvailableRooms: existingApartment?.countAvailableRooms ?? 2,
    location: {
      country: existingApartment?.location.country ?? undefined,
      city: existingApartment?.location.city ?? undefined,
      district: existingApartment?.location.district ?? undefined,
      address: existingApartment?.location.address ?? undefined
    },
    photos: existingApartment?.photos ?? [],
    description: existingApartment?.description ?? ''
  })

  const location = useLocation()
  const [nextDisabled, setNextDisabled] = useState(true)

  const getActiveStepFromURI = (): ApartmentsQuestionnaireRoutes => {
    const paths = location.pathname.split('/')
    const activeStep = paths[paths.length - 1]
    if (activeStep === undefined || activeStep === null || activeStep === '') {
      throw new Error('Unable to get active step from URI!')
    }
    if (![
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

  useEffect(() => {
    const activeStep = getActiveStepFromURI()
    setNextBtnVisible(activeStep !== ApartmentsQuestionnaireRoutes.SUMMARY)
    setBackBtnVisible(activeStep !== ApartmentsQuestionnaireRoutes.BASIC)
    setFinishBtnVisible(activeStep === ApartmentsQuestionnaireRoutes.SUMMARY)
  }, [location.pathname])

  const onNextStep = (): void => {
    const activeStep = getActiveStepFromURI()
    switch (activeStep) {
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
    const activeStep = getActiveStepFromURI()
    switch (activeStep) {
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

  const saveApartment = async (apartment: Apartment): Promise<void> => {
    setBackdropVisible(true)
    setBackdropMessage('Saving your apartment!')
    const photos = await saveAllApartmentsPhotos(apartment.photos)
    const dto = mapApartmentToDto({
      ...apartment,
      photos
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
      photos
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
    if (apartment.id === 0) {
      void saveApartment(apartment as unknown as Apartment)
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
