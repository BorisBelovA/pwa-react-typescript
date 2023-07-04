import { Box, Button, Card, Typography, useTheme } from '@mui/material'
import styles from './SleepingHabbits.module.scss'
import { useStore } from 'src/utils/StoreProvider'
import { AcUnit, NightsStay, WbTwilight } from '@mui/icons-material'
import { useEffect, useMemo } from 'react'
import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import { SleepingHabits } from 'models'
import { useNavigate } from 'react-router-dom'
import commonStyles from '../BasicQuestions.module.scss'

export const SleepingHabbits = (): JSX.Element => {
  const theme = useTheme()
  const { themeStore } = useStore()
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

  const color = useMemo(() => {
    return themeStore.theme === 'light'
      ? theme.palette.primary.light
      : ''
  }, [themeStore.theme])

  const unselectedStyle = {
    border: themeStore.theme === 'light'
      ? '2px solid'
      : '',
    color
  }

  const selectedStyle = {
    backgroundColor: themeStore.theme === 'light'
      ? theme.palette.primary.light
      : theme.palette.primary.dark,
    color: themeStore.theme === 'light'
      ? theme.palette.background.default
      : ''
  }

  const sleepHabit = useMemo(() => {
    return questions.sleepingHabits
  }, [questions.sleepingHabits])

  return <Box className={commonStyles.question}>
    <Box className={commonStyles.question__head}>
      <Typography variant='h1'>Sleeping habbits</Typography>
    </Box>

    <Box className={`${commonStyles.question__content} ${styles.justify_center}`}>
      <Box className={styles.cards_container}>
        <Card className={styles.card}
          sx={
            sleepHabit === 'Lark'
              ? selectedStyle
              : unselectedStyle
          }
          onClick={() => { choose('Lark') }}
        >
          <WbTwilight sx={{ fontSize: 50 }}></WbTwilight>
          <Typography variant='body1'>Lark</Typography>
        </Card>

        <Card className={styles.card}
          sx={
            sleepHabit === 'Owl'
              ? selectedStyle
              : unselectedStyle
          }
          onClick={() => { choose('Owl') }}>
          <NightsStay sx={{ fontSize: 50 }}></NightsStay>
          <Typography variant='body1'>Owl</Typography>
        </Card>

        <Card className={styles.card}
          sx={
            sleepHabit === 'Other'
              ? selectedStyle
              : unselectedStyle
          } onClick={() => { choose('Other') }}>
          <AcUnit sx={{ fontSize: 50 }}></AcUnit>
          <Typography variant='body1'>Other</Typography>
        </Card>
      </Box>
    </Box>

    <Box className={commonStyles.question__nav}>
      <Button fullWidth
        variant='outlined'
        onClick={() => {
          navigate(-1)
        }}>
        Back
      </Button>

      <Button fullWidth
        variant='contained'
        onClick={() => {
          navigate('../alcohol')
        }}>
        Next
      </Button>
    </Box>
  </Box>
}