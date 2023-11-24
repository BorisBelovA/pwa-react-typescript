import { Box, Button, Typography } from '@mui/material'
import styles from './SleepingHabbits.module.scss'
import { useEffect, useMemo } from 'react'
import { useBasicQuestions } from 'layouts/QuestionnaireBasic/QuestionnaireBasic'
import { QuestionnaireRoutes, type SleepingHabits } from 'models'
import { useNavigate } from 'react-router-dom'
import commonStyles from '../BasicQuestions.module.scss'
import { type Option, OptionCards } from 'components/OptionCards/OptionCards'
import { t } from '@lingui/macro'

export const SleepingHabbits = (): JSX.Element => {
  const { questions, setQuestions, setActive, setPercent } = useBasicQuestions()
  const navigate = useNavigate()

  useEffect(() => {
    setActive('sleep')
    if (questions.sleepingHabits) {
      setPercent(100, 100, 'sleep')
    }
  }, [])

  const choose = (habit: SleepingHabits): void => {
    setQuestions({
      ...questions,
      sleepingHabits: habit
    })
    setPercent(100, 100, 'sleep')
  }

  const sleepHabit = useMemo(() => {
    return questions.sleepingHabits
  }, [questions.sleepingHabits])

  const options: Array<Option<SleepingHabits>> = [
    { text: t`Lark`, value: 'Lark', icon: 'wb_sunny' },
    { text: t`Owl`, value: 'Owl', icon: 'nights_stay' },
    { text: t`Other`, value: 'Other', icon: 'ac_unit' }
  ]

  return <Box className={commonStyles.question}>
    <Box className={commonStyles.question__head}>
      <Typography variant='h1'>{t`Sleeping habbits`}</Typography>
    </Box>

    <Box className={`${commonStyles.question__content} ${styles.justify_center}`}>
      <OptionCards options={options}
        selected={sleepHabit}
        selectCallback={value => {
          if (value) {
            choose(value)
          }
        }}></OptionCards>
    </Box>

    <Box className={commonStyles.question__nav}>
      <Button fullWidth
        variant='outlined'
        onClick={() => {
          navigate(`../${QuestionnaireRoutes.LANGUAGES}`)
        }}>
        {t`Back`}
      </Button>

      <Button fullWidth
        variant='contained'
        onClick={() => {
          navigate(`../${QuestionnaireRoutes.ALCOHOL}`)
        }}>
        {t`Next`}
      </Button>
    </Box>
  </Box>
}
