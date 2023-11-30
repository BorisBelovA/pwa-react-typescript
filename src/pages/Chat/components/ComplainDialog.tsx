import { Box, Button, Dialog, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'
import styles from './ComplainDialog.module.scss'
import { t } from '@lingui/macro'

export interface ComplainDialogProps {
  visible: boolean
  sendComplainCallback: (message: string) => Promise<void>
  closeDialog: () => void
}

export const ComplainDialog = ({ visible, sendComplainCallback, closeDialog }: ComplainDialogProps): JSX.Element => {
  const [complain, setComplain] = useState<string>('')

  return <Dialog open={visible} fullWidth maxWidth='lg'>
    <DialogTitle>{t`Tell us what is wrong?`}</DialogTitle>
    <Box className={styles.container}>
      <TextField
        label={t`Your feedback`}
        multiline
        fullWidth
        minRows={4}
        onChange={(event) => {
          setComplain(event.target.value)
        }}
      />

      <Box className={styles.buttons_container}>
        <Button variant='outlined'
          color='error'
          fullWidth
          onClick={() => {
            setComplain('')
            closeDialog()
          }}>
          {t`Cancel`}
        </Button>
        <Button variant='contained'
          fullWidth
          disabled={complain.length === 0}
          onClick={() => {
            void sendComplainCallback(complain)
            setComplain('')
          }}>
          {t`Send`}
        </Button>
      </Box>
    </Box>
  </Dialog>
}
