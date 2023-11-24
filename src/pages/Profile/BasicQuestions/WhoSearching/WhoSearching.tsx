import { Box, Button, Typography } from '@mui/material'
import styles from './WhoSearching.module.scss'
import commonStyles from '../BasicQuestions.module.scss'
import { useBasicQuestions } from 'layouts/QuestionnaireBasic/QuestionnaireBasic'
import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { type Option, OptionCards } from 'components/OptionCards/OptionCards'
import { QuestionnaireRoutes, type RelationsType } from 'models'
import { t } from '@lingui/macro'

export const WhoSearching = (): JSX.Element => {
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
    setQuestions({ ...questions, who: 'Couple', whoContains: undefined })
  }

  const handleNext = (): void => {
    if (!questions.who) {
      return
    }
    if (questions.who === 'Alone') {
      removeItem('Not Alone')
      navigate(`/profile/questionnaire-basic-info/${QuestionnaireRoutes.PETS}`)
    } else {
      setPercent(100, 100, 'who')
      insertItem('Not Alone', 'not-alone', 1)
      navigate(`/profile/questionnaire-basic-info/${QuestionnaireRoutes.NOT_ALONE}`)
    }
  }

  const options: Array<Option<RelationsType>> = [
    { text: t`Alone`, value: 'Alone', icon: 'person' },
    { text: t`Not alone`, value: 'Couple', icon: 'groups' }
  ]

  return <Box className={commonStyles.question}>
    <Box className={commonStyles.question__head}>
      <Typography variant='h1'>{t`Who's looking`}</Typography>
    </Box>

    <Box className={`${commonStyles.question__content} ${styles.justify_center}`}>
      <OptionCards options={options}
        selected={whoSearching}
        selectCallback={(value) => {
          if (value === 'Alone') {
            choseAlone()
          } else {
            choseNotAlone()
          }
        }}></OptionCards>
    </Box>

    <Box className={commonStyles.question__nav}>
      <div className={commonStyles.question__button_half}></div>
      <div className={commonStyles.question__button_half}>
        <Button variant='contained'
          fullWidth
          disabled={!questions.who}
          onClick={handleNext}>
          {t`Next`}
        </Button>
      </div>
    </Box>
  </Box>
}
