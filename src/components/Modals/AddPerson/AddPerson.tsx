import { Box, Button, Card, IconButton, Modal, TextField, Typography } from '@mui/material'
import styles from './AddPerson.module.scss'
import CloseIcon from '@mui/icons-material/Close'
import { type ShortUser } from 'models'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { emailPatternValidator } from 'utils/validations'

interface Props {
  open: boolean
  handleClose: () => void
  who: string
  addPerson: (person: string | ShortUser) => void
}
const AddPerson = ({ open, handleClose, who, addPerson }: Props): JSX.Element => {
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<string>('')

  // Email form
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<{ email: string }>({
    defaultValues: {
      email: ''
    },
    mode: 'all'
  })

  const createBlankPerson = (): ShortUser => {
    if (!!name && !!age) {
      return { name, age: +age }
    }
    throw new Error('Name and age are not specified!')
  }

  const inviteUser = (data: { email: string }): void => {
    const { email } = data
    if (!email) {
      throw new Error('Email is not specified!')
    }
    addPerson(email)
    handleClose()
  }

  const createNonExistingUser = (): void => {
    addPerson(createBlankPerson())
    handleClose()
  }

  const createBtnDisabled = (): boolean => {
    return !name || !age
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Card className={styles.addPerson}>
        <Box className={styles.addPerson__head}>
          <Typography variant='h1'>Add a {who}</Typography>
          <IconButton onClick={handleClose}><CloseIcon /></IconButton>
        </Box>
        <Box className={styles.addPerson__input}>
          <Typography variant='body2'>You can send invite by email</Typography>
          <Box className={styles.addPerson__invite}>
            <TextField
              type='email'
              label='Email'
              variant='outlined'
              error={!(errors.email == null)}
              size="small"
              {...register('email', {
                pattern: emailPatternValidator,
                required: 'Email is required'
              })
              }
              helperText={errors.email?.message ?? ''}
              className={styles.addPerson__inviteInput} />
            <Button className={styles.addPerson__inviteButton}
              disabled={!isValid}
              onClick={() => { handleSubmit(inviteUser) }}>
              Invite
            </Button>
          </Box>
        </Box>
        <Box className={styles.addPerson__input}>
          <Typography variant='body2'>or create new</Typography>
          <TextField value={name} onChange={e => { setName(e.target.value) }} label='Name' variant='outlined' />
          <TextField value={age} onChange={e => { setAge(e.target.value) }} type='number' label='Age' variant='outlined' />
          <Button variant='contained'
            disabled={createBtnDisabled()}
            onClick={createNonExistingUser}>
            Create
          </Button>
        </Box>
      </Card>
    </Modal>
  )
}
export default AddPerson
