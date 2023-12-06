import { Box, Button, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import ApartmentThumbnail from 'components/Cards/ApartmentThumbnail/ApartmentThumbnail'
import styles from './ApartmentSearch.module.scss'
import { useStore } from 'utils/StoreProvider'
import { FilterAltOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { t } from '@lingui/macro'
import { useMainContext } from 'layouts/Main/MainLayout'
import { type Step, Steps } from 'intro.js-react'
import { dynamicTooltips, tooltips } from 'assets/data/intro-steps/apartment-search'
import { defaultStepsOptions, stepsFactory } from 'assets/data/intro-steps/steps'
import { type Apartment } from 'models'

const mockApartment = (): Apartment => {
  return {
    id: 0,
    name: 'Beautiful apartment',
    totalPrice: 0,
    currency: 'EUR',
    countRooms: 4,
    countAvailableRooms: 2,
    location: {
      country: { id: 1, name: 'Israil', emoji: '' },
      city: { id: 1, name: 'Tel-Aviv' },
      district: null,
      address: null
    },
    photos: [],
    phone: 'xx-xx-xx-xx-xx',
    description: 'Very good apartment',
    formId: 0,
    purpose: 'Rent'
  }
}

const ApartmentSearch: React.FunctionComponent = (): JSX.Element => {
  const { apartmentFiltersStore, apartmentSearchStore, themeStore, walkthroughStore } = useStore()
  const { setMessage } = useMainContext()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const setMockApartment = (): void => {
    apartmentSearchStore.setApartments([mockApartment()])
  }

  const loadApartments = async (): Promise<void> => {
    if (apartmentSearchStore.apartments.length < 1) {
      setLoading(true)
      apartmentFiltersStore.getFromLocalStorage()
      apartmentFiltersStore.setPage(0)
      try {
        await apartmentSearchStore.getApartments()
      } catch (error) {
        setMessage({
          text: error instanceof Error
            ? error.message
            : t`Something went wrong`,
          severity: 'error',
          life: 5000,
          visible: true
        })
      }
      if (!apartmentSearchStore.apartments.length) {
        setMockApartment()
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    if (apartmentSearchStore.apartments.length < 1) {
      void loadApartments()
    }
    const root = document.getElementById('root')
    const handleScroll = (): void => {
      apartmentSearchStore.setScroll(root?.scrollTop ?? 0)
    }
    root?.addEventListener('scroll', handleScroll)
    if (apartmentSearchStore.scroll > 0) {
      root?.scroll({ top: apartmentSearchStore.scroll })
    }
    return () => {
      root?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!loading && apartmentSearchStore.apartments.length) {
      setIntroSteps(stepsFactory(
        [...tooltips, ...dynamicTooltips],
        themeStore.theme
      ))
      stepsClass?.introJs.refresh(true)
      setTimeout(() => {
        setStepsReady(true)
      }, 100)
    }
  }, [loading, apartmentSearchStore.apartments.length])

  const getMore = async (): Promise<void> => {
    apartmentSearchStore.getMoreApartments()
      .catch((error) => {
        setMessage({
          text: error instanceof Error
            ? error.message
            : t`Something went wrong`,
          severity: 'error',
          life: 5000,
          visible: true
        })
      })
  }

  const [introSteps, setIntroSteps] = useState<Step[]>(stepsFactory(tooltips, themeStore.theme))
  const [stepsReady, setStepsReady] = useState(false)
  const [stepsClass, setStepsClass] = useState<Steps | null>(null)

  return (
    <Box className={styles.householdContainer}>
      <Box className={styles.household__header}>
        <Typography variant='h1'>{t`Search for apartments`}</Typography>
        <IconButton
          data-intro-id='apartment-search-filters'
          color='primary'
          sx={{ paddingBlock: '0' }}
          onClick={() => { navigate('filters') }}>
          <FilterAltOutlined />
        </IconButton>
      </Box>
      {apartmentSearchStore.apartments.map((apartment) =>
        <ApartmentThumbnail data-intro-id="apartment-search-apartment-thumbnail"
          apartment={apartment}
          key={apartment.id} />
      )}
      {apartmentSearchStore.haveMore
        ? <Button data-intro-id="apartment-search-try-again"
          variant='contained'
          onClick={() => { void getMore() }}>
          {t`Load more`}
        </Button>
        : <Box className={styles.household__noMore}>
          <Typography variant='h2'>{t`Sorry, can't find more apartments`}</Typography>
          <Button variant='contained' onClick={() => { navigate('filters') }}>{t`Change filters`}</Button>
          <Button variant='outlined' onClick={() => { void getMore() }}>{t`Try again`}</Button>
        </Box>
      }

      <Steps
        enabled={walkthroughStore.walkthroughVisible && stepsReady}
        steps={introSteps}
        initialStep={0}
        ref={(steps) => { setStepsClass(steps) }}
        options={{
          ...defaultStepsOptions,
          doneLabel: 'Go to Search'
        }}
        onComplete={() => {
          apartmentSearchStore.resetApartments()
          navigate('/search')
        }}
        onExit={(stepIndex) => {
          if (stepIndex !== introSteps.length && stepIndex !== -1) {
            walkthroughStore.finishWalkthrough()
            apartmentSearchStore.resetApartments()
          }
        }}
      />
    </Box>
  )
}

export default observer(ApartmentSearch)
