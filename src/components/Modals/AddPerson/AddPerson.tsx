import { Box, Button, Card, IconButton, Modal, TextField, Typography } from '@mui/material'
import styles from './AddPerson.module.scss'
import CloseIcon from '@mui/icons-material/Close'
import { type User } from 'models'
import { useState } from 'react'

interface Props {
  open: boolean
  handleClose: () => void
  who: string
  addPerson: (person: string | User) => void
}
const AddPerson = (props: Props): JSX.Element => {
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<string>('')

  const createBlankPerson = (): User => {
    const birthDate = new Date(new Date().getFullYear() - Number(age), 1)
    return {
      firstName: name,
      lastName: '',
      gender: 'M',
      birthday: birthDate,
      phone: null,
      photo: null,
      avatar: null
    }
  }

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
    >
      <Card className={styles.addPerson}>
        <Box className={styles.addPerson__head}>
          <Typography variant='h1'>Add a {props.who}</Typography>
          <IconButton onClick={props.handleClose}><CloseIcon /></IconButton>
        </Box>
        <Box className={styles.addPerson__input}>
          <Typography variant='body2'>You can send invite by email</Typography>
          <Box className={styles.addPerson__invite}>
            <TextField
              value={email}
              onChange={e => { setEmail(e.target.value) }}
              type='email'
              label='Email'
              variant='outlined'
              className={styles.addPerson__inviteInput} />
            <Button className={styles.addPerson__inviteButton} onClick={() => {
              props.addPerson(email)
              props.handleClose()
            }}>invite</Button>
          </Box>
        </Box>
        <Box className={styles.addPerson__input}>
          <Typography variant='body2'>or create new</Typography>
          <TextField value={name} onChange={e => { setName(e.target.value) }} label='Name' variant='outlined' />
          <TextField value={age} onChange={e => { setAge(e.target.value) }} type='number' label='Age' variant='outlined' />
          <Button variant='contained' onClick={() => {
            props.addPerson(createBlankPerson())
            props.handleClose()
          }}>create</Button>
        </Box>
      </Card>
    </Modal>
  )
}
export default AddPerson
