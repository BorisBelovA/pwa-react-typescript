import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import styles from '../../Profile.module.scss'
import { useStore } from 'utils/StoreProvider'
import { useState } from 'react'
import { sessionService, userApiService } from 'api-services'
import { useMainContext } from 'layouts/Main/MainLayout'
import BackButton from 'components/Buttons/BackButton/BackButton'
import { Trans, t } from '@lingui/macro'

const AccountSettings = (): JSX.Element => {
  const navigate = useNavigate()
  const { userStore, questionnaireStore, apartmentStore } = useStore()
  const [deleteDialogVisible, setDeleteDialogVisible] = useState<boolean>(false)
  const { setMessage, setBackdropMessage, setBackdropVisible } = useMainContext()

  const deleteAccount = async (): Promise<void> => {
    const token = sessionService.authToken
    if (!token) {
      return
    }
    setDeleteDialogVisible(false)
    setBackdropVisible(true)
    setBackdropMessage(t({ message: 'Removing all information about you' }))
    try {
      void await userApiService.deleteAccount(token)
      setTimeout(() => {
        setBackdropVisible(false)
        userStore.deleteFromStorage()
        questionnaireStore.deleteQuestionnaire()
        apartmentStore.deleteApartments()
        navigate('/auth')
      }, 2000)
    } catch (e) {
      setBackdropVisible(false)
      setMessage({
        text: e instanceof Error
          ? e.message
          : t({ message: 'Something went wrong' }),
        severity: 'error',
        life: 5000,
        visible: true
      })
    }
  }
  return (
    <Box className={styles.profile__container}>
      <Box className={`${styles.profile__header} ${styles.mb1}`}>
        <BackButton />
        <Typography variant='h1'><Trans>Account</Trans></Typography>
      </Box>
      <Box>
        <Button variant="outlined"
          color="error"
          fullWidth
          onClick={() => {
            userStore.deleteFromStorage()
            questionnaireStore.deleteQuestionnaire()
            apartmentStore.deleteApartments()
            navigate('/profile')
          }}>
          <Trans>Logout</Trans>
        </Button>

        <Button variant="outlined"
          color="error"
          fullWidth
          sx={{ marginTop: '2rem' }}
          onClick={() => {
            setDeleteDialogVisible(true)
          }}
        >
          <Trans>Delete your account</Trans>
        </Button>
      </Box>

      <Dialog open={deleteDialogVisible}
        onClose={() => { setDeleteDialogVisible(false) }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle><Trans>Delete your account</Trans></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Trans>You are trying to permanently delete your account. Are you sure about that?</Trans>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '1rem'
        }}>
          <Button fullWidth variant='contained' onClick={() => { setDeleteDialogVisible(false) }} autoFocus>
            <Trans>No, I&apos;ve changed my mind</Trans>
          </Button>
          <Button fullWidth variant="outlined" color='error' onClick={() => { void deleteAccount() }}>
            <Trans>Yes, delete my account</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
export default AccountSettings
