import { Box, Button, Typography } from '@mui/material'
import { type User } from 'models'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActive } from 'src/components'
import ProfileCard from 'src/components/ProfileCard/ProfileCard'
import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import styles from '../BasicQuestions.module.scss'

const Summary = (): JSX.Element => {
  const navigate = useNavigate()
  const { setActive } = useActive()
  const { questions } = useBasicQuestions()
  const tempUser: User = {
    firstName: 'Anonymous',
    lastName: '',
    gender: 'M',
    avatar: '',
    birthday: new Date('10.01.1986'),
    phone: '',
    photo: ''
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
          onClick={() => {
            navigate('/profile/')
          }}>
          Finish
        </Button>
      </Box>
    </Box>
  )
}
export default Summary
