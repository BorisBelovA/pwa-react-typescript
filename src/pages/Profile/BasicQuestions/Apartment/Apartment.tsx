import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActive } from 'src/components/ProgressSlider/ProgressSlider'
import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import styles from '../BasicQuestions.module.scss'

const Apartment: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const { setActive, setPercent } = useActive()
  const { questions, setQuestions } = useBasicQuestions()

  useEffect(() => { setActive('apartment') }, [])

  return (
    <Box className={styles.question}>
      <Box className={styles.question__head}>
        <Typography className={styles.question__head_text} variant='h1'>Do you already have an apartment?</Typography>
      </Box>
      <Box className={styles.question__content}>
        <ToggleButtonGroup
          size='small'
          color='primary'
          value={questions.apartment}
          exclusive
          fullWidth
          onChange={(e, value) => {
            setQuestions({ ...questions, apartment: value })
          }}>
          <ToggleButton value={false}>no</ToggleButton>
          <ToggleButton value={true}>yes</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box className={styles.question__nav}>
        <Button variant='text'
          fullWidth
          onClick={() => {
            setQuestions({ ...questions, apartment: undefined })
            setPercent(0, 1, 'apartment')
            navigate('/profile/questionnaire-basic-info/summary')
          }}>
          Skip
        </Button>
        <Button variant='contained'
          fullWidth
          onClick={() => {
            navigate('/profile/questionnaire-basic-info/summary')
          }}>
          Next
        </Button>
      </Box>
    </Box>
  )
}
export default Apartment
