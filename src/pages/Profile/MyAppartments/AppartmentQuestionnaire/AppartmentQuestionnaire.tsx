import { Box, Button } from '@mui/material'
import { Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import ProgressSlider from 'src/components/ProgressSlider/ProgressSlider'
import useProgressSlider from 'src/components/ProgressSlider/useProgressSlider'
import { type MainLayoutContext, useMainContext } from 'src/layouts/Main/MainLayout'
import styles from './AppartmentQuestionnaire.module.scss'
import { useEffect, useState } from 'react'
import { type Appartment, AppartmentsRoutes } from 'models'
import { mapBase64ToFile, mapAppartmentToDto, mapFileToBase64, mapAppartmentToModel } from 'mapping-services'
import { filesApiService } from 'src/api/api-services/files'
import { appartmentService } from 'src/api/api-services/appartment'
import { useStore } from 'src/utils/StoreProvider'

export type AppartmentQuestionnaireContext = MainLayoutContext & {
  appartment: Appartment
  setAppartment: React.Dispatch<React.SetStateAction<Appartment>>
  setNextDisabled: React.Dispatch<React.SetStateAction<boolean>>
  setActive: (active: string) => void
  setPercent: (percent: number, total: number, to: string) => void
}

export const appartmentQuestionnaireContext = (): AppartmentQuestionnaireContext => {
  return useOutletContext<AppartmentQuestionnaireContext>()
}

const saveAllAppartmentsPhotos = async (photos: string[]): Promise<string[]> => {
  const requests = photos.map(async (photo, index) => {
    const file = await mapBase64ToFile(photo, `${new Date().toISOString()}-${index}`)
    return await filesApiService.uploadFile(file)
  })
  return await Promise.all(requests)
}

export const AppartmentQuestionnaire = (): JSX.Element => {
  const { items, setActive, completeStep, setPercent } = useProgressSlider({
    items: [
      { text: AppartmentsRoutes.BASIC, progress: 0, to: AppartmentsRoutes.BASIC },
      { text: AppartmentsRoutes.LOCATION, progress: 0, to: AppartmentsRoutes.LOCATION },
      { text: AppartmentsRoutes.PHOTOS, progress: 0, to: AppartmentsRoutes.PHOTOS },
      { text: AppartmentsRoutes.ABOUT, progress: 0, to: AppartmentsRoutes.ABOUT },
      { text: AppartmentsRoutes.SUMMARY, progress: 0, to: AppartmentsRoutes.SUMMARY }
    ]
  })

  const [nextBtnVisible, setNextBtnVisible] = useState(true)
  const [backBtnVisible, setBackBtnVisible] = useState(false)
  const [finishBtnVisible, setFinishBtnVisible] = useState(false)

  const { setBackdropVisible, setBackdropMessage, setMessage } = appartmentQuestionnaireContext()
  const { appartmentStore } = useStore()

  const navigate = useNavigate()
  const [appartment, setAppartment] = useState<Appartment>({
    id: appartmentStore.appartments[0]?.id ?? 0,
    name: appartmentStore.appartments[0]?.name ?? '',
    totalPrice: appartmentStore.appartments[0]?.totalPrice ?? null,
    curency: appartmentStore.appartments[0]?.curency ?? 'ILS',
    countRooms: appartmentStore.appartments[0]?.countRooms ?? 4,
    countAvailableRooms: appartmentStore.appartments[0]?.countAvailableRooms ?? 2,
    location: {
      country: appartmentStore.appartments[0]?.location.country ?? '',
      city: appartmentStore.appartments[0]?.location.city ?? '',
      district: appartmentStore.appartments[0]?.location.district ?? ''
    },
    photos: appartmentStore.appartments[0]?.photos ?? [],
    description: appartmentStore.appartments[0]?.description ?? ''
  })

  const location = useLocation()
  const [nextDisabled, setNextDisabled] = useState(true)

  const getActiveStepFromURI = (): AppartmentsRoutes => {
    const paths = location.pathname.split('/')
    const activeStep = paths[paths.length - 1]
    if (activeStep === undefined || activeStep === null || activeStep === '') {
      throw new Error('Unable to get active step from URI!')
    }
    if (![
      AppartmentsRoutes.BASIC,
      AppartmentsRoutes.LOCATION,
      AppartmentsRoutes.PHOTOS,
      AppartmentsRoutes.ABOUT,
      AppartmentsRoutes.SUMMARY
    ].includes(activeStep as AppartmentsRoutes)) {
      throw new Error('Incorrect appartments questionnaire step!')
    }
    return activeStep as AppartmentsRoutes
  }

  useEffect(() => {
    const activeStep = getActiveStepFromURI()
    setNextBtnVisible(activeStep !== AppartmentsRoutes.SUMMARY)
    setBackBtnVisible(activeStep !== AppartmentsRoutes.BASIC)
    setFinishBtnVisible(activeStep === AppartmentsRoutes.SUMMARY)
  }, [location.pathname])

  const onNextStep = (): void => {
    const activeStep = getActiveStepFromURI()
    switch (activeStep) {
      case AppartmentsRoutes.BASIC: {
        completeStep(AppartmentsRoutes.BASIC)
        navigate(AppartmentsRoutes.LOCATION)
        break
      }
      case AppartmentsRoutes.LOCATION: {
        const stepProgress = items[1].progress
        if (stepProgress === 100) {
          completeStep(AppartmentsRoutes.LOCATION)
        } else {
          setActive(AppartmentsRoutes.PHOTOS)
        }
        navigate(AppartmentsRoutes.PHOTOS)
        break
      }
      case AppartmentsRoutes.PHOTOS: {
        completeStep(AppartmentsRoutes.PHOTOS)
        navigate(AppartmentsRoutes.ABOUT)
        break
      }
      case AppartmentsRoutes.ABOUT: {
        completeStep(AppartmentsRoutes.ABOUT)
        navigate(AppartmentsRoutes.SUMMARY)
        break
      }
      default: {
        throw new Error('Unknow step to complete!')
      }
    }
  }

  const onPrevStep = (): void => {
    const activeStep = getActiveStepFromURI()
    switch (activeStep) {
      case AppartmentsRoutes.LOCATION: {
        navigate(AppartmentsRoutes.BASIC)
        break
      }
      case AppartmentsRoutes.PHOTOS: {
        navigate(AppartmentsRoutes.LOCATION)
        break
      }
      case AppartmentsRoutes.ABOUT: {
        navigate(AppartmentsRoutes.PHOTOS)
        break
      }
      case AppartmentsRoutes.SUMMARY: {
        navigate(AppartmentsRoutes.ABOUT)
        break
      }
      default: {
        throw new Error('Unknow step to complete!')
      }
    }
  }

  const saveAppartment = async (appartment: Appartment): Promise<void> => {
    setBackdropVisible(true)
    setBackdropMessage('Saving your appartment!')
    const photos = await saveAllAppartmentsPhotos(appartment.photos)
    const dto = mapAppartmentToDto({
      ...appartment,
      photos
    })
    try {
      setBackdropMessage('Almost done!')
      const savedAppartment = await appartmentService.addNewAppartment(dto)
      setBackdropVisible(false)
      appartmentStore.setAppartments([{
        ...appartment,
        id: savedAppartment.id
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

  const updateAppartment = async (appartment: Appartment): Promise<void> => {
    setBackdropVisible(true)
    setBackdropMessage('Updating your appartment!')
    const photos = await saveAllAppartmentsPhotos(appartment.photos)
    const dto = mapAppartmentToDto({
      ...appartment,
      photos
    })
    try {
      setBackdropMessage('Almost done!')
      const savedAppartment = await appartmentService.updateAppartment(dto)
      setBackdropVisible(false)
      appartmentStore.setAppartments([{
        ...mapAppartmentToModel(savedAppartment),
        photos: appartment.photos
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
    if (appartment.id === 0) {
      saveAppartment(appartment)
    } else {
      updateAppartment(appartment)
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
          appartment,
          setAppartment,
          setNextDisabled
        }} />
      </Box>

      <Box className={styles.buttons_container}>
        <Box className={styles.buttons_container_column}>
          {backBtnVisible && <Button
            fullWidth
            variant="outlined"
            onClick={onPrevStep}>
            Back
          </Button>
          }
        </Box>
        {nextBtnVisible && <Button className={styles.buttons_container_column}
          fullWidth
          variant="contained"
          disabled={nextDisabled}
          onClick={onNextStep}>
          Next
        </Button>
        }
        {finishBtnVisible && <Button className={styles.buttons_container_column}
          fullWidth
          variant="contained"
          onClick={onFinish}>
          Finish
        </Button>
        }
      </Box>
    </Box>
  </>
}
