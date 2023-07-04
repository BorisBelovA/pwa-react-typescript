import { Box, Button, Card, Typography, useTheme } from '@mui/material'
import GroupsIcon from '@mui/icons-material/Groups'
import PersonIcon from '@mui/icons-material/Person'
import styles from './WhoSearching.module.scss'
import commonStyles from '../BasicQuestions.module.scss'
import { useStore } from 'src/utils/StoreProvider'
import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo } from 'react'

export const WhoSearching = (): JSX.Element => {
  const theme = useTheme()
  const { themeStore } = useStore()
  const navigate = useNavigate()
  const { questions, setQuestions, setPercent, insertItem, removeItem, setActive } = useBasicQuestions()

  const whoSearching = useMemo(() => {
    return questions.who
  }, [questions.who])

  useEffect(() => {
    setActive('who')
  }, [])

  useEffect(() => {
    if (questions.who) {
      setPercent(1, 1, 'who')
    }
  }, [questions.who, questions.whoContains])

  const choseAlone = (): void => {
    setQuestions({
      ...questions,
      who: 'Alone',
      countAdults: null,
      countKids: null,
      whoContains: undefined
    })
  }

  const choseNotAlone = (): void => {
    setQuestions({ ...questions, who: 'Friends', whoContains: undefined })
  }

  const handleNext = (): void => {
    if (!questions.who) {
      return
    }
    if (questions.who === 'Alone') {
      removeItem('Not Alone')
      navigate('/profile/questionnaire-basic-info/pets')
    } else {
      setPercent(100, 100, 'who')
      insertItem('Not Alone', 'not-alone', 1)
      navigate('/profile/questionnaire-basic-info/not-alone')
    }
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

  return <Box className={commonStyles.question}>
    <Box className={commonStyles.question__head}>
      <Typography variant='h1'>Who's looking</Typography>
    </Box>

    <Box className={`${commonStyles.question__content} ${styles.justify_center}`}>
      <Box className={styles.cards_container}>
        <Card className={styles.card}
          sx={
            whoSearching === 'Alone'
              ? selectedStyle
              : unselectedStyle
          }
          onClick={choseAlone}
        >
          <PersonIcon sx={{ fontSize: 50 }}></PersonIcon>
          <Typography variant='body1'>Alone</Typography>
        </Card>

        <Card className={styles.card}
          sx={
            whoSearching === 'Friends'
              ? selectedStyle
              : unselectedStyle
          }
          onClick={choseNotAlone}>
          <GroupsIcon sx={{ fontSize: 50 }}></GroupsIcon>
          <Typography variant='body1'>Not alone</Typography>
        </Card>
      </Box>

    </Box>

    <Box className={commonStyles.question__nav}>
      <div className={commonStyles.question__button_half}></div>
      <div className={commonStyles.question__button_half}>
        <Button variant='contained'
          fullWidth
          disabled={!questions.who}
          onClick={handleNext}>
          Next
        </Button>
      </div>
    </Box>
  </Box>
}
