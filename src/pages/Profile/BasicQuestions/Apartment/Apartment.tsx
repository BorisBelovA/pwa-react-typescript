import { Avatar, Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActive } from 'src/components/ProgressSlider/ProgressSlider'
import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import styles from '../BasicQuestions.module.scss'
import apartmentStyles from './Apartment.module.scss'
import { useStore } from 'src/utils/StoreProvider'
import * as models from 'models'
import HomeIcon from '@mui/icons-material/Home';
import { ApartmentsRoutes, ProfileRoutes } from 'models'
import { observer } from 'mobx-react-lite'

interface ApartmentProps {
  apartment: models.Apartment
  name: string
  onSelect: (apartment: models.Apartment | null) => void
}

const ApartmentItem = ({ apartment, name, onSelect }: ApartmentProps): JSX.Element => {
  const currentSelected = name === apartment.name
  return <Box className={`${apartmentStyles.apartment_item} ${currentSelected ? apartmentStyles.selected : ''}`}
    onClick={(e) => {
      if (currentSelected) {
        onSelect(null)
      } else {
        onSelect(apartment)
      }
    }}>
    <Avatar alt="Apartment Image" src={apartment.photos[0]}>
      <HomeIcon />
    </Avatar>
    <Box className={apartmentStyles.info}>
      <Typography>{apartment.name}</Typography>
      <Box className={apartmentStyles.location}>
        <Typography>{apartment.location.country.name}</Typography>
        {apartment.location.district && <Typography>, {apartment.location.district.name}</Typography>}
        {apartment.location.city && <Typography>, {apartment.location.city.name}</Typography>}
      </Box>
    </Box>
  </Box>
}

const Apartment: React.FunctionComponent = observer(() => {
  const navigate = useNavigate()
  const { setActive, setPercent } = useActive()
  const [displayApartment, setDisplayApartment] = useState(false)
  const { questions, setQuestions } = useBasicQuestions()
  const { apartmentStore, questionnaireStore } = useStore()

  const [newApartment, setNewApartment] = useState<models.Apartment | null>(null)

  useEffect(() => {
    if (!apartmentStore.haveApartment) {
      void apartmentStore.getApartment()
    }
    setDisplayApartment(!!questions.apartment)
    setActive('apartment')
  }, [])

  // apartments located in the same place as user
  const apartments = useMemo(() => {
    const { country, state } = questions.location
    if (!!country && !!state) {
      const apartments = apartmentStore.apartments
        .filter(i => i.location.country.id === country.id &&
          i.location.district?.id === state.id &&
          (i.purpose === 'Other' || i.formId === questions.id)
        )
      if (newApartment) {
        return [...apartments, newApartment]
      }
      return apartments
    }
    return []
  }, [apartmentStore.apartments, newApartment])

  useEffect(() => {
    if (questions.apartment?.id === null && !newApartment) {
      setNewApartment(questions.apartment)
    }
  }, [questions.apartment, newApartment])

  const goToApartmentQuest = (): void => {
    questionnaireStore.setQuestionnaire(questions)
    navigate(`/profile/${ProfileRoutes.MY_APARTMENT}/${ApartmentsRoutes.NEW}/basic?purpose=questionnaire`)
  }

  useEffect(() => {
    setPercent(
      displayApartment
        ? 0
        : 100,
      100,
      'apartment'
    )
  }, [displayApartment])

  useEffect(() => {
    setDisplayApartment(!!questions.apartment)
  }, [])
  const handleNext = (): void => {
    navigate(`../${models.QuestionnaireRoutes.ABOUT}`)
  }

  const setSelectedApartment = (apartment: models.Apartment | null): void => {
    setQuestions({
      ...questions,
      apartment
    })
    setPercent(
      apartment === null ? 0 : 100,
      100,
      'apartment'
    )
  }

  const removeNewApartment = (): void => {
    questionnaireStore.setQuestionnaire({
      ...questions,
      apartment: null
    })
    setQuestions({
      ...questions,
      apartment: null
    })
    setNewApartment(null)
  }

  return (
    <Box className={styles.question}>
      <Box className={styles.question__head}>
        <Typography className={styles.question__head_text} variant='h1'>Do you already have an apartment?</Typography>
      </Box>
      <Box className={styles.question__content}>
        <ToggleButtonGroup
          size='small'
          color='primary'
          value={displayApartment}
          exclusive
          fullWidth
          onChange={(e, value) => {
            setDisplayApartment(value)
          }}>
          <ToggleButton value={false}>no</ToggleButton>
          <ToggleButton value={true}>yes</ToggleButton>
        </ToggleButtonGroup>

        {displayApartment &&
          <>
            <Typography>Select apartment from the list or create new</Typography>
            <Box className={apartmentStyles.list}>
              {apartments.map((a, idx) => <ApartmentItem apartment={a} key={`${a.name}-${a.totalPrice}`}
                  name={questions.apartment?.name ?? ''}
                  onSelect={setSelectedApartment}></ApartmentItem>)}
            </Box>
            {questions.apartment === null && !newApartment &&
              <Button variant='outlined'
                fullWidth
                onClick={goToApartmentQuest}>
                Add new apartment
              </Button>
            }

            {questions.apartment?.id === null &&
              <Button variant='outlined'
                fullWidth
                onClick={removeNewApartment}>
                Remove
              </Button>
            }
          </>
        }
      </Box>
      <Box className={styles.question__nav}>
        <Button variant='outlined'
          fullWidth
          onClick={() => {
            navigate(`../${models.QuestionnaireRoutes.LOCATION}`)
          }}>
          Back
        </Button>
        <Button variant='contained'
          fullWidth
          disabled={displayApartment && questions.apartment === null}
          onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Box>
  )
})
export default Apartment
