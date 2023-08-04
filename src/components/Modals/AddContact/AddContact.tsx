import { Box, Button, Card, IconButton, Modal, styled, 
  SvgIcon, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { type Contact } from 'models'
import styles from './AddContact.module.scss'
import CloseIcon from '@mui/icons-material/Close'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import { ReactComponent as TelegramIcon } from '../../../assets/sm-icons/TelegramIcon.svg'
import { ReactComponent as InstagramIcon } from '../../../assets/sm-icons/InstagramIcon.svg'
import { ReactComponent as OtherIcon } from '../../../assets/sm-icons/OtherIcon.svg'
import { useState } from 'react'

interface Props {
  open: boolean
  handleClose: () => void
  addContact: (person: Contact) => void
}

const ContactTougleGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    border: 0,
    '&.Mui-disabled': {
      border: 0
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius
    }
  }
}))

const ContactToggleButton = styled(ToggleButton)(({ theme }) => ({
  color: theme.palette.primary.light,
  '&.Mui-selected, &.Mui-selected:hover': {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.primary.light
  }
}))

const AddContact = (props: Props): JSX.Element => {
  const [contact, setContact] = useState<Contact>({
    type: 'email',
    contact: '',
    hidden: false
  })
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
    >
      <Card className={styles.addContact}>
        <Box className={styles.addContact__head}>
          <Typography variant='h1'>Add contact</Typography>
          <IconButton onClick={props.handleClose}><CloseIcon color='primary' /></IconButton>
        </Box>
        <Box className={styles.addContact__input}>
          <Typography>Choose type</Typography>
          <ContactTougleGroup
            size='small'
            fullWidth
            color='primary'
            exclusive
            value={contact.type}
            onChange={(e, value) => { setContact({ ...contact, type: value }) }}
          >
            <ContactToggleButton value='email' aria-label='left aligned'>
              <EmailIcon />
            </ContactToggleButton>
            <ContactToggleButton value='phone' aria-label='left aligned'>
              <LocalPhoneIcon />
            </ContactToggleButton>
            <ContactToggleButton value='telegram' aria-label='left aligned'>
              <SvgIcon><TelegramIcon /></SvgIcon>
            </ContactToggleButton>
            <ContactToggleButton value='instagram' aria-label='left aligned'>
              <SvgIcon><InstagramIcon /></SvgIcon>
            </ContactToggleButton>
            <ContactToggleButton value='other' aria-label='left aligned'>
              <SvgIcon><OtherIcon /></SvgIcon>
            </ContactToggleButton>
          </ContactTougleGroup>
          <TextField
            fullWidth
            size='small'
            value={contact.contact}
            label={contact.type}
            onChange={e => { setContact({ ...contact, contact: e.target.value }) }}
          />
          <Button variant='contained' onClick={() => {
            props.addContact(contact)
            props.handleClose()
          }}>Add</Button>
        </Box>
      </Card>
    </Modal>
  )
}
export default AddContact
