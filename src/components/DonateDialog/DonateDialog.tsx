import { Trans } from '@lingui/macro'
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
      <Trans>Support us</Trans>
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        <Trans>
          If you like what we do you can support us with
        </Trans>
        <Link href="https://www.donationalerts.com/r/evgenia2808" target='_blank'> <Trans>donation</Trans></Link> ♥️
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => { setVisible(false) }}><Trans>Close</Trans></Button>
    </DialogActions>
  </Dialog>
}
