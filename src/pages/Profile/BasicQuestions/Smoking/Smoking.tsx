import { Box, Button, Checkbox, FormControlLabel, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActive } from 'src/components/ProgressSlider/ProgressSlider'
import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import styles from '../BasicQuestions.module.scss'

const Smoking: React.FunctionComponent = () => {
  const { setActive, setPercent } = useActive()
  const { questions, setQuestions } = useBasicQuestions()
  const navigate = useNavigate()
  const options = ['cigarettes', 'vape', 'shisha', 'cigars', 'other']

  useEffect(() => { setActive('smoking') }, [])

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, option: string): void => {
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

  const nextBtnDisabled = useMemo(() => {
    const smoker = questions.smoker
    if (smoker === undefined) {
      return true
    }
    return smoker
      ? questions.smokingWhat.length === 0
      : false
  }, [questions.smoker, questions.smokingWhat])

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
        <Button variant='text'
          fullWidth
          onClick={() => {
            setQuestions({ ...questions, smoker: undefined, smokingWhat: [] })
            setPercent(0, 1, 'smoking')
            navigate('/profile/questionnaire-basic-info/languages')
          }}>
          Skip
        </Button>
        <Button variant='contained'
          fullWidth
          disabled={nextBtnDisabled}
          onClick={() => {
            navigate('/profile/questionnaire-basic-info/languages')
          }}>
          Next
        </Button>
      </Box>
    </Box>
  )
}
export default Smoking
