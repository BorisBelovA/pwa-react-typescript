import { Box, Button, IconButton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { type ShortUser, type WhoFamily } from 'models'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import styles from './Who.module.scss'
import { ReactComponent as SwitchIcon } from '../../../../assets/icons/switch.svg'
import AddPerson from 'src/components/Modals/AddPerson/AddPerson'
import PersonCard from 'src/components/PersonCard/PersonCard'

const Family: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const { questions, setQuestions } = useBasicQuestions()
  const [open, setOpen] = useState(false)

  const handleOpen = (): void => { setOpen(true) }
  const handleClose = (): void => { setOpen(false) }

  const familyMembers = useMemo(() => {
    const whoContains = (questions.whoContains as WhoFamily)
    return whoContains?.people ?? []
  }, [(questions.whoContains as WhoFamily)?.people])

  const adults = useMemo(() => {
    const whoContains = (questions.whoContains as WhoFamily)
    return whoContains.adults ?? 0
  }, [(questions.whoContains as WhoFamily)?.adults])

  const kids = useMemo(() => {
    const whoContains = (questions.whoContains as WhoFamily)
    return whoContains?.kids
  }, [(questions.whoContains as WhoFamily)?.kids])

  const addPerson = (person: string | ShortUser): void => {
    setQuestions({
      ...questions,
      whoContains: {
        ...questions.whoContains,
        people: [
          ...familyMembers,
          person
        ]
      } as WhoFamily
    })
  }

  const handleDelete = (index: number): void => {
    if (familyMembers !== undefined) {
      setQuestions({
        ...questions,
        whoContains: {
          ...questions.whoContains,
          people: familyMembers.filter((s, i) => i !== index)
        } as WhoFamily
      })
    }
  }

  const onAdultsNumberChange = (evt: React.MouseEvent<HTMLElement, MouseEvent>, count: number): void => {
    setQuestions({
      ...questions,
      whoContains: {
        ...questions.whoContains,
        adults: count
      } as WhoFamily
    })
  }

  const onKidsNumberChange = (evt: React.MouseEvent<HTMLElement, MouseEvent>, count: number): void => {
    setQuestions({
      ...questions,
      whoContains: {
        ...questions.whoContains,
        kids: count
      } as WhoFamily
    })
  }

  const nextButtonDisable = (): boolean => {
    return adults === 0 || (kids === undefined || kids === null)
  }

  return (
    <Box className={styles.who}>
      <Box className={styles.who__head}>
        <Typography variant='h1'>Family</Typography>
        <IconButton onClick={() => {
          setQuestions({ ...questions, who: undefined, whoContains: undefined })
        }}><SwitchIcon /></IconButton>
      </Box>
      <Box className={styles.who__input}>
        <Typography variant='h2'>How many adults</Typography>
        <ToggleButtonGroup
          size='small'
          fullWidth
          color='primary'
          value={(questions.whoContains as WhoFamily)?.adults}
          exclusive
          onChange={onAdultsNumberChange}>
          <ToggleButton value={1}>1</ToggleButton>
          <ToggleButton value={2}>2</ToggleButton>
          <ToggleButton value={3}>3</ToggleButton>
          <ToggleButton value={4}>more</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box className={styles.who__input}>
        <Typography variant='h2'>How many kids</Typography>
        <ToggleButtonGroup
          size='small'
          fullWidth
          color='primary'
          value={(questions.whoContains as WhoFamily)?.kids}
          exclusive
          onChange={onKidsNumberChange}>
          <ToggleButton value={0}>0</ToggleButton>
          <ToggleButton value={1}>1</ToggleButton>
          <ToggleButton value={2}>2</ToggleButton>
          <ToggleButton value={3}>3</ToggleButton>
          <ToggleButton value={4}>more</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box className={styles.who__add}>
        <Typography variant='body2'>If your family members have an account you can create a group</Typography>
        <Button variant='outlined' onClick={handleOpen}>Add a family member</Button>
      </Box>
      <Box className={styles.who__persons}>
        {familyMembers.map((member, index) =>
          <PersonCard key={index} person={member} waiting index={index} handleDelete={handleDelete} />)
        }
      </Box>
      <Box className={styles.who__nav}>
        <Button
          className={styles.who__navButton}
          variant='contained'
          disabled={nextButtonDisable()}
          onClick={() => {
            navigate('/profile/questionnaire-basic-info/pets')
          }}>Next</Button>
      </Box>
      <AddPerson open={open} handleClose={handleClose} who='family member' addPerson={addPerson} />
    </Box>
  )
}
export default Family
