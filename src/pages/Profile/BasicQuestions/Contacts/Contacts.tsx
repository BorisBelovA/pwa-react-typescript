import { Box, Button, Typography } from '@mui/material'
import { type Contact } from 'models'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContactCard from 'src/components/ContactCard/ContactCard'
import AddContact from 'src/components/Modals/AddContact/AddContact'
import { useActive } from 'src/components/ProgressSlider/ProgressSlider'
import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import styles from '../BasicQuestions.module.scss'

const Contacts: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const { setActive } = useActive()
  const { questions, setQuestions } = useBasicQuestions()
  const [open, setOpen] = useState(false)

  const handleOpen = (): void => { setOpen(true) }
  const handleClose = (): void => { setOpen(false) }

  const addContact = (contact: Contact): void => {
    setQuestions({ ...questions, contacts: [...questions.contacts, contact] })
  }

  const nextBtnDisabled = useMemo(() => {
    return questions.contacts.length === 0
  }, [questions.contacts])

  useEffect(() => { setActive('contacts') }, [])
  return (
    <Box className={styles.question}>
      <Box className={styles.question__head}>
        <Typography className={styles.question__head_text} variant='h1'>
          What contacts you are willing to share with people you will match with?
        </Typography>
      </Box>
      <Box className={styles.question__content}>
        <Button variant='outlined' onClick={handleOpen}>Add contact</Button>
        {questions.contacts.map((contact, index) => (
          <ContactCard key={index} contact={contact} />
        ))}
      </Box>
      <Box className={styles.question__nav}>
        <Box></Box>
        <Button variant='contained'
          className={styles.question__button_half}
          disabled={nextBtnDisabled}
          onClick={() => {
            navigate('../apartment')
          }}>
          Next
        </Button>
      </Box>
      <AddContact open={open} handleClose={handleClose} addContact={addContact} />
    </Box>
  )
}
export default Contacts
