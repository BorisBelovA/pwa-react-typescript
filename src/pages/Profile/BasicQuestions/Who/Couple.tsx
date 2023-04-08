import { Box, Button, IconButton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { type ShortUser, type CoupleType, type WhoCouple } from 'models'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddPerson from 'src/components/Modals/AddPerson/AddPerson'
import PersonCard from 'src/components/PersonCard/PersonCard'
import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import { ReactComponent as SwitchIcon } from '../../../../assets/icons/switch.svg'
import styles from './Who.module.scss'

const Couple: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const { questions, setQuestions } = useBasicQuestions()
  const [open, setOpen] = useState(false)
  const coupleTypes: CoupleType[] = [
    'MF',
    'FF',
    'MM',
    'other'
  ]

  const nextDisabled = questions.who === undefined || questions.whoContains === undefined

  const handleOpen = (): void => { setOpen(true) }
  const handleClose = (): void => { setOpen(false) }
  const addPerson = (person: string | ShortUser): void => {
    setQuestions({
      ...questions,
      whoContains: { ...questions.whoContains, partner: person }
    })
  }
  const handleDelete = (index: number): void => {
    setQuestions({
      ...questions,
      whoContains: { ...questions.whoContains, partner: undefined }
    })
  }

  const selectCoupleType = (
    // Specific ReactMouseEvent interface required for ToggleButtonComponent
    event: React.MouseEvent<HTMLElement>,
    // When select button - returns CoupleType
    // When deselect - null
    kind: CoupleType | null
  ): void => {
    const whoContains: WhoCouple = {
      kind: kind ?? undefined,
      partner
    }
    setQuestions({
      ...questions,
      whoContains
    })
  }

  const partner = useMemo(() => {
    const whoContains = questions.whoContains as WhoCouple | undefined
    return whoContains?.partner
  }, [(questions.whoContains as WhoCouple | undefined)])

  return (
    <Box className={styles.who}>
      <Box className={styles.who__head}>
        <Typography variant='h1'>Couple</Typography>
        <IconButton onClick={() => {
          setQuestions({ ...questions, who: undefined, whoContains: undefined })
        }}><SwitchIcon /></IconButton>
      </Box>
      <Box className={styles.who__input}>
        <Typography variant='h2'>Type</Typography>
        <ToggleButtonGroup
          size='small'
          fullWidth
          color='primary'
          value={(questions.whoContains as WhoCouple)?.kind}
          exclusive
          onChange={selectCoupleType}>
          {
            coupleTypes.map(
              (type, idx) => <ToggleButton key={idx} value={type}>{type}</ToggleButton>
            )
          }
        </ToggleButtonGroup>
      </Box>
      <Box className={styles.who__add}>
        <Typography variant='body2'>If your partner have an account you can create a group</Typography>
        <Button variant='outlined' onClick={handleOpen}>Add partner</Button>
      </Box>
      <Box className={styles.who__persons}>
        {partner !== undefined &&
          <PersonCard person={partner} waiting index={0} handleDelete={handleDelete} />}
      </Box>
      <Box className={styles.who__nav}>
        <Button
          disabled={nextDisabled}
          className={styles.who__navButton}
          variant='contained'
          onClick={() => {
            navigate('/profile/questionnaire-basic-info/pets')
          }}>Next</Button>
      </Box>
      { open && <AddPerson open={open} handleClose={handleClose} who='partner' addPerson={addPerson} />}
    </Box>
  )
}
export default Couple
