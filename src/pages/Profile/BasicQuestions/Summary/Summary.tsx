import { Box, Button, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActive } from 'src/components'
import ProfileCard from 'src/components/ProfileCard/ProfileCard'
import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import styles from '../BasicQuestions.module.scss'
import { questionnaireService } from 'api-services'
import { useMainContext } from 'src/layouts/Main/MainLayout'
import { useStore } from 'src/utils/StoreProvider'
import { observer } from 'mobx-react-lite'
import { QuestionnaireBasicType } from 'models'

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
        setBackdropMessage('Almost done')
        setTimeout(() => {
          navigate('/profile/')
        }, 2000)
      })
      .catch(err => {
        console.error(err)
        questionnaireStore.setQuestionnaire(questions)
        setMessage({
          visible: true,
          text: err.message,
          severity: 'error'
        })
      })
      .finally(() => {
        setBackdropVisible(false)
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
          setBackdropMessage('Almost done')
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
    setBackdropMessage('Sending questionnaire data')
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
        <Typography className={styles.question__head_text} variant='h1'>Everything is correct?</Typography>
      </Box>
      <Box className={styles.question__content_preview}>
        <ProfileCard info={questions} person={user} />
      </Box>
      <Box className={styles.question__nav_preview}>
        <Button variant='outlined'
          className={styles.question__button_half}
          onClick={(e) => {
            navigate(-1)
          }}>
          Back
        </Button>
        <Button variant='contained'
          className={styles.question__button_half}
          onClick={(e) => { finishQuest() }}>
          Finish
        </Button>
      </Box>
    </Box>
  )
})
export default Summary
