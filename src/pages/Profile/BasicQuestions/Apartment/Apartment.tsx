import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActive } from 'src/components/ProgressSlider/ProgressSlider'
import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import styles from '../BasicQuestions.module.scss'

const Apartment: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const { setActive, setPercent } = useActive()
  const [displayApartment, setDisplayApartment] = useState(false)
  const { questions, setMessage } = useBasicQuestions()

  useEffect(() => { setActive('apartment') }, [])

  const goToApartmentQuest = (): void => {
    setMessage({
      visible: true,
      severity: 'info',
      text: 'По этой кнопочке ты будешь идти в создание квартиры, но потом',
      life: 8000
    })
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
    navigate('../summary')
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
          <Button variant='outlined'
            fullWidth
            onClick={goToApartmentQuest}>
            Add apartment
          </Button>
        }
      </Box>
      <Box className={styles.question__nav}>
        <Button variant='outlined'
          fullWidth
          onClick={() => {
            navigate(-1)
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
}
export default Apartment
