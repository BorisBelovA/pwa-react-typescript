import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Link } from '@mui/material'

export interface DonateDialogProps {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const DonateDialog = ({ visible, setVisible }: DonateDialogProps): JSX.Element => {
  return <Dialog
    open={visible}
    onClose={() => { setVisible(false) }}
  >
    <DialogTitle>
      Support us
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        If you like what we do you can support us with
        <Link href="https://www.donationalerts.com/r/evgenia2808"> donation</Link> ♥️
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => { setVisible(false) }}>Close</Button>
    </DialogActions>
  </Dialog>
}
