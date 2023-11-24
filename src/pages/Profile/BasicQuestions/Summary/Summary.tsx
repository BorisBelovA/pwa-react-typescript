import { Box, Button, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActive } from 'components'
import { useBasicQuestions } from 'layouts/QuestionnaireBasic/QuestionnaireBasic'
import styles from '../BasicQuestions.module.scss'
import { questionnaireService } from 'api-services'
import { useMainContext } from 'layouts/Main/MainLayout'
import { useStore } from 'utils/StoreProvider'
import { observer } from 'mobx-react-lite'
import { QuestionnaireRoutes } from 'models'
import CardProfile from 'components/Cards/CardProfile/CardProfile'
import CardDualPA from 'components/Cards/CardDualPA/CardDualPA'
import { t } from '@lingui/macro'

const Summary = observer((): JSX.Element => {
  const navigate = useNavigate()
  const { setActive } = useActive()
  const { questions } = useBasicQuestions()
  const {
    setBackdropVisible,
    setBackdropMessage,
    setMessage
  } = useMainContext()
  const { userStore, questionnaireStore } = useStore()

  const user = useMemo(() => {
    return userStore.user
  }, [userStore.user])

  const createQuestionnaire = (): void => {
    questionnaireService.createQuestForm(questions)
      .then((dto) => {
        questionnaireStore.setQuestionnaire({
          ...questions,
          id: dto.id
        })
        setBackdropMessage(t`Almost done`)
        setTimeout(() => {
          setBackdropVisible(false)
          navigate('/profile/')
        }, 2000)
      })
      .catch(err => {
        console.error(err)
        questionnaireStore.setQuestionnaire(questions)
        setBackdropVisible(false)
        setMessage({
          visible: true,
          text: err.message,
          severity: 'error'
        })
      })
  }

  const updateQuestionnaire = (): void => {
    questionnaireService.updateQuestForm(questions)
      .then((dto) => {
        questionnaireStore.setQuestionnaire({
          ...questions,
          id: dto.id
        })
        setTimeout(() => {
          setBackdropMessage(t`Almost done`)
        }, 1000)
        setTimeout(() => {
          setBackdropVisible(false)
          navigate('/profile/')
        }, 1500)
      })
      .catch(err => {
        console.error(err)
        questionnaireStore.setQuestionnaire(questions)
        setMessage({
          visible: true,
          text: err.message,
          severity: 'error'
        })
        setBackdropVisible(false)
      })
  }

  const finishQuest = (): void => {
    setBackdropVisible(true)
    setBackdropMessage(t`Sending questionnaire data`)
    if (questions.id === 0) {
      createQuestionnaire()
    } else {
      updateQuestionnaire()
    }
  }

  useEffect(() => { setActive('summary') }, [])
  return (
    <Box className={styles.question__preview}>
      <Box className={styles.question__head}>
        <Typography className={styles.question__head_text} variant='h1'>{t`Everything is correct?`}</Typography>
      </Box>
      <Box className={styles.question__content_preview}>
        {questions.apartment
          ? <CardDualPA match={{ user, form: questions }} padding='1rem'/>
          : <CardProfile info={questions} person={user} />
        }
      </Box>
      <Box className={styles.question__nav_preview}>
        <Button variant='outlined'
          className={styles.question__button_half}
          onClick={(e) => {
            navigate(`../${QuestionnaireRoutes.ABOUT}`)
          }}>
          {t`Back`}
        </Button>
        <Button variant='contained'
          className={styles.question__button_half}
          onClick={(e) => { finishQuest() }}>
          {t`Finish`}
        </Button>
      </Box>
    </Box>
  )
})
export default Summary
