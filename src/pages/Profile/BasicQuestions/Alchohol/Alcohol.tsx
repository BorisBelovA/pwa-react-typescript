import { Box, Button, FormControlLabel, Radio, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import styles from '../BasicQuestions.module.scss'
import { useBasicQuestions } from 'layouts/QuestionnaireBasic/QuestionnaireBasic'
import { useEffect, useState } from 'react'
import { QuestionnaireRoutes, type Alcoholic } from 'models'
import { useNavigate } from 'react-router-dom'
import { t } from '@lingui/macro'

export const Alcohol = (): JSX.Element => {
  const { questions, setQuestions, setActive, setPercent } = useBasicQuestions()
  const [drinkAlcohol, setDrinkAlcohol] = useState<boolean | null>(null)
  const navigate = useNavigate()

  interface Option {
    type: Alcoholic
    text: string
  }

  const options: Option[] = [
    { type: 'Against drink', text: t`Against drink` },
    { type: 'Not against drink', text: t`Not against drink` },
    { type: 'Partly drink', text: t`Partly drink` },
    { type: 'Sometimes drink', text: t`Sometimes drink` },
    { type: 'Other', text: t`Other` }
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
    if (questions.alcohol !== null) {
      setDrinkAlcohol(true)
    }
    if (questions.alcohol) {
      setPercent(100, 100, 'alcohol')
    }
  }, [])

  return <Box className={styles.question}>
    <Box className={styles.question__head}>
      <Typography className={styles.question__head_text}>{t`Do you drink alcohol?`}</Typography>
      <ToggleButtonGroup size='small'
        dir='ltr'
        color='primary'
        value={drinkAlcohol}
        exclusive
        onChange={(e, value) => {
          if (value !== null) {
            setDrinkAlcohol(value)
            setPercent(
              value ? 100 : 0,
              100,
              'alcohol'
            )
          }
          if (!value) {
            setAlcoholicType(null)
          }
        }}>
        <ToggleButton value={false}>{t`no`}</ToggleButton>
        <ToggleButton value={true}>{t`yes`}</ToggleButton>
      </ToggleButtonGroup>
    </Box>

    <Box className={styles.question__content}>
      {drinkAlcohol &&
        <Box className={styles.question__input}>
          <Typography variant='h2'>{t`What is your attitude to alcohol?`}</Typography>
          <Box className={styles.question__input_zeroGap}>
            {options.map((type, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    value=''
                    checked={questions.alcohol === type.type}
                    onChange={(e) => { setAlcoholicType(type.type) }}
                  />
                }
                label={type.text} />
            ))}
          </Box>
        </Box>
      }
    </Box>

    <Box className={styles.question__nav}>
      <Button variant='outlined'
        fullWidth
        onClick={() => {
          navigate(`../${QuestionnaireRoutes.SLEEP}`)
        }}>
        {t`Back`}
      </Button>
      <Button variant='contained'
        fullWidth
        disabled={!!drinkAlcohol && !questions.alcohol}
        onClick={() => {
          navigate(`../${QuestionnaireRoutes.GUESTS}`)
        }}>
        {t`Next`}
      </Button>
    </Box>
  </Box>
}
