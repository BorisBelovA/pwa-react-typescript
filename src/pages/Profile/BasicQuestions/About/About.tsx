import { Box, Button, TextField, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActive } from 'src/components/ProgressSlider/ProgressSlider'
import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import styles from '../BasicQuestions.module.scss'
import { QuestionnaireRoutes } from 'models'

const About: React.FunctionComponent = () => {
  const { setActive, setPercent } = useActive()
  const { questions, setQuestions } = useBasicQuestions()
  const navigate = useNavigate()

  useEffect(() => { setActive('about') }, [])

  useEffect(() => {
    if (questions.about) {
      setPercent(1, 1, 'about')
    }
  })

  return (
    <Box className={styles.question}>
      <Box className={styles.question__head}>
        <Typography className={styles.question__head_text} variant='h1'>Something else you think will be helpful?</Typography>
      </Box>
      <Box className={styles.question__content}>
        <TextField
          value={questions.about}
          onChange={(e) => { setQuestions({ ...questions, about: e.target.value }) }}
          hiddenLabel
          fullWidth
          multiline
          size='small'
          rows={21}
        />
      </Box>
      <Box className={styles.question__nav}>
        <Button variant='outlined'
          fullWidth
          onClick={() => {
            navigate(`../${QuestionnaireRoutes.APARTMENT}`)
          }}>
          Back
        </Button>
        <Button variant='contained'
          fullWidth
          onClick={() => {
            setPercent(100, 100, 'about')
            navigate(`../${QuestionnaireRoutes.SUMMARY}`)
          }}>
          Next
        </Button>
      </Box>
    </Box>
  )
}
export default About
