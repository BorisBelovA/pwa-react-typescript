import { Box, Button, FormControlLabel, Radio, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import styles from '../BasicQuestions.module.scss'
import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import { useEffect, useState } from 'react'
import { type Alcoholic } from 'models'
import { useNavigate } from 'react-router-dom'

export const Alcohol = (): JSX.Element => {
  const { questions, setQuestions, setActive, setPercent } = useBasicQuestions()
  const [drinkAlcohol, setDrinkAlcohol] = useState(false)
  const navigate = useNavigate()

  const options: Alcoholic[] = [
    'Against drink',
    'Not against drink',
    'Partly drink',
    'Sometimes drink',
    'Other',
    'ARBUSER'
  ]

  const setAlcoholicType = (type: Alcoholic | null): void => {
    setQuestions({
      ...questions,
      alcohol: type
    })
    setPercent(100, 100, 'alcohol')
  }

  useEffect(() => {
    setActive('alcohol')
    setDrinkAlcohol(!!questions.alcohol)
    if (questions.alcohol) {
      setPercent(100, 100, 'alcohol')
    }
  }, [])

  return <Box className={styles.question}>
    <Box className={styles.question__head}>
      <Typography className={styles.question__head_text}>Do you drink alcohol?</Typography>
      <ToggleButtonGroup size='small'
        color='primary'
        value={drinkAlcohol}
        exclusive
        onChange={(e, value) => {
          setDrinkAlcohol(value)
          setPercent(
            value ? 0 : 100,
            100,
            'alcohol'
          )
          if (!value) {
            setAlcoholicType(null)
          }
        }}>
        <ToggleButton value={false}>no</ToggleButton>
        <ToggleButton value={true}>yes</ToggleButton>
      </ToggleButtonGroup>
    </Box>

    <Box className={styles.question__content}>
      {drinkAlcohol &&
        <Box className={styles.question__input}>
          <Typography variant='h2'>What is your attitude to alcohol?</Typography>
          <Box className={styles.question__input_zeroGap}>
            {options.map((type, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    value=''
                    checked={questions.alcohol === type}
                    onChange={(e) => { setAlcoholicType(type) }}
                  />
                }
                label={type} />
            ))}
          </Box>
        </Box>
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
        disabled={drinkAlcohol && !questions.alcohol}
        onClick={() => {
          navigate('../guests')
        }}>
        Next
      </Button>
    </Box>
  </Box>
}
