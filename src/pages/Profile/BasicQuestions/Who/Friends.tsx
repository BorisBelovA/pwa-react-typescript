import { Box, Button, IconButton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import styles from './Who.module.scss'
import { ReactComponent as SwitchIcon } from '../../../../assets/icons/switch.svg'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import { type ShortUser, type WhoFriends } from 'models'
import PersonCard from 'src/components/PersonCard/PersonCard'
import AddPerson from 'src/components/Modals/AddPerson/AddPerson'

const Friends: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const { questions, setQuestions } = useBasicQuestions()
  const [open, setOpen] = useState(false)

  const handleOpen = (): void => { setOpen(true) }
  const handleClose = (): void => { setOpen(false) }

  const friends = useMemo(() => {
    const whoContains = questions.whoContains as WhoFriends | undefined
    return whoContains?.people
  }, [(questions.whoContains as WhoFriends | undefined)])

  const addPerson = (person: string | ShortUser): void => {
    setQuestions({
      ...questions,
      whoContains: {
        ...questions.whoContains,
        people: [...(friends ?? []), person]
      } as WhoFriends
    })
  }

  const handleDelete = (index: number): void => {
    if (friends !== undefined) {
      setQuestions({
        ...questions,
        whoContains: {
          ...questions.whoContains,
          people: friends.filter((s, i) => i !== index)
        } as WhoFriends
      })
    }
  }

  const onFriendsAmountChange = (evt: React.MouseEvent<HTMLElement, MouseEvent>, count: number | null): void => {
    setQuestions({
      ...questions,
      whoContains: { ...questions.whoContains, count: count ?? 0 } as WhoFriends
    })
  }
  const nextBtnDisabled = (): boolean => {
    const count = (questions.whoContains as WhoFriends)?.count ?? 0
    return count === 0
  }

  return (
    <Box className={styles.who}>
      <Box className={styles.who__head}>
        <Typography variant='h1'>Friends</Typography>
        <IconButton onClick={() => {
          setQuestions({ ...questions, who: undefined, whoContains: undefined })
        }}><SwitchIcon /></IconButton>
      </Box>
      <Box className={styles.who__input}>
        <Typography variant='h2'>How many</Typography>
        <ToggleButtonGroup
          size='small'
          fullWidth
          color='primary'
          value={(questions.whoContains as WhoFriends)?.count}
          exclusive
          onChange={onFriendsAmountChange}>
          <ToggleButton value={2}>2</ToggleButton>
          <ToggleButton value={3}>3</ToggleButton>
          <ToggleButton value={4}>4</ToggleButton>
          <ToggleButton value={5}>more</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box className={styles.who__add}>
        <Typography variant="body2">If your friends have an account you can create a group</Typography>
        <Button variant='outlined' onClick={handleOpen}>Add friend</Button>
      </Box>
      <Box className={styles.who__persons}>
        {friends !== undefined && friends.length > 0 &&
          friends.map((friend, index) =>
            <PersonCard key={index} person={friend} waiting index={index} handleDelete={handleDelete} />)
        }
      </Box>
      <Box className={styles.who__nav}>
        <Button
          className={styles.who__navButton}
          variant='contained'
          disabled={nextBtnDisabled()}
          onClick={() => {
            navigate('../pets')
          }}>Next</Button>
      </Box>
      {open && <AddPerson open={open} handleClose={handleClose} who='friend' addPerson={addPerson} />}
    </Box>
  )
}
export default Friends
