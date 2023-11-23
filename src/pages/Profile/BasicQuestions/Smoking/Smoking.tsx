import { Box, Button, Checkbox, FormControlLabel, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActive } from 'components/ProgressSlider/ProgressSlider'
import { useBasicQuestions } from 'layouts/QuestionnaireBasic/QuestionnaireBasic'
import styles from '../BasicQuestions.module.scss'
import { QuestionnaireRoutes, type WhatSmoke } from 'models'

const Smoking: React.FunctionComponent = () => {
  const { setActive } = useActive()
  const { questions, setQuestions, setPercent } = useBasicQuestions()
  const navigate = useNavigate()
  const options: WhatSmoke[] = ['Cigarettes', 'Vape', 'Shisha', 'Cigars', 'Other']

  useEffect(() => { setActive('smoking') }, [])

  useEffect(() => {
    const isSmoking: number = questions.smoker === undefined || questions.smoker === null ? 0 : 1
    const total: number = (questions.smoker === true) ? 2 : 1
    const isSmokingWhat: number = questions.smokingWhat?.length > 0 && questions.smoker === true ? 1 : 0
    setPercent(isSmoking + isSmokingWhat, total, 'smoking')
  }, [questions.smoker, questions.smokingWhat])

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, option: WhatSmoke): void => {
    if (e.target.checked) {
      setQuestions({ ...questions, smokingWhat: questions.smokingWhat.concat([option]) })
    } else {
      setQuestions({ ...questions, smokingWhat: questions.smokingWhat.filter((item) => (item !== option)) })
    }
  }

  const setIsSmoker = (e: React.MouseEvent<HTMLElement, MouseEvent>, value: boolean | null): void => {
    setQuestions({
      ...questions,
      smoker: value === null
        ? undefined
        : value
    })
  }

  return (
    <Box className={styles.question}>
      <Box className={styles.question__head}>
        <Typography className={styles.question__head_text} variant='h1'>Do you smoke?</Typography>
        <ToggleButtonGroup
          size='small'
          color='primary'
          value={questions.smoker}
          exclusive
          onChange={setIsSmoker}>
          <ToggleButton value={false}>no</ToggleButton>
          <ToggleButton value={true}>yes</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box className={styles.question__content}>
        {questions.smoker === true && (
          <>
            <Box className={styles.question__input}>
              <Typography variant='h2'>What do you like to smoke?</Typography>
              <Box className={styles.question__input_zeroGap}>
                {options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox
                      value=''
                      checked={questions.smokingWhat.some(what => what === option)}
                      onChange={(e) => { handleCheck(e, option) }}
                    />}
                    label={option} />
                ))}
              </Box>
            </Box>
          </>
        )}
      </Box>
      <Box className={styles.question__nav}>
        <Button variant='outlined'
          fullWidth
          onClick={() => {
            navigate(`../${QuestionnaireRoutes.PETS}`)
          }}>
          Back
        </Button>
        <Button variant='contained'
          fullWidth
          onClick={() => {
            navigate(`../${QuestionnaireRoutes.LANGUAGES}`)
          }}>
          Next
        </Button>
      </Box>
    </Box>
  )
}
export default Smoking
