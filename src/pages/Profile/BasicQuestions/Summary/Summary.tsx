import { Box, Button, Typography } from '@mui/material'
import { type User } from 'models'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActive } from 'src/components'
import ProfileCard from 'src/components/ProfileCard/ProfileCard'
import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import styles from '../BasicQuestions.module.scss'
import { q } from 'api-services'
import { useMainContext } from 'src/layouts/Main/MainLayout'

const Summary = (): JSX.Element => {
  const navigate = useNavigate()
  const { setActive } = useActive()
  const { questions } = useBasicQuestions()
  const {
    setBackdropVisible,
    setBackdropMessage,
    setMessage
  } = useMainContext()
  const tempUser: User = {
    firstName: 'Anonymous',
    lastName: '',
    gender: 'M',
    avatar: '',
    birthday: new Date('10.01.1986'),
    phone: '',
    photo: ''
  }

  const finishQuest = (): void => {
    console.log(questions)
    setBackdropVisible(true)
    setBackdropMessage('Sending questionnaire data')
    q.createQuestForm(questions)
      .then((_) => {
        setBackdropMessage('Almost done')
        setTimeout(() => {
          navigate('/profile/')
        }, 2000)
      })
      .catch(err => {
        console.error(err)
        setBackdropVisible(false)
        setMessage({
          visible: true,
          text: err.message,
          severity: 'error'
        })
      })
  }

  useEffect(() => { setActive('summary') }, [])
  return (
    <Box className={styles.question__preview}>
      <Box className={styles.question__head}>
        <Typography className={styles.question__head_text} variant='h1'>Everything correct?</Typography>
      </Box>
      <Box className={styles.question__content_preview}>
        <ProfileCard info={questions} person={tempUser} />
      </Box>
      <Box className={styles.question__nav_preview}>
        <Box></Box>
        <Button variant='contained'
          className={styles.question__button_half}
          onClick={(e) => { finishQuest() }}>
          Finish
        </Button>
      </Box>
    </Box>
  )
}
export default Summary
