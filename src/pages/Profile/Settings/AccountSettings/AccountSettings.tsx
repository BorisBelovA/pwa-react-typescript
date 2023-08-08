import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import styles from '../../Profile.module.scss'
import { useStore } from 'src/utils/StoreProvider'
import { useState } from 'react'
import { sessionService, userApiService } from 'api-services'
import { useMainContext } from 'src/layouts/Main/MainLayout'
import BackButton from 'src/components/Buttons/BackButton/BackButton'

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
    setBackdropMessage('Removing all information about you')
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
          : 'Something went wrong',
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
        <Typography variant='h1'>Account</Typography>
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
          }}
        >Logout</Button>

        <Button variant="outlined"
          color="error"
          fullWidth
          sx={{ marginTop: '2rem' }}
          onClick={() => {
            setDeleteDialogVisible(true)
          }}
        >Delete your account</Button>
      </Box>

      <Dialog open={deleteDialogVisible}
        onClose={() => { setDeleteDialogVisible(false) }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle>Delete your account</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are trying to permanently delete your account. Are you sure about that?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '1rem'
        }}>
          <Button fullWidth variant='contained' onClick={() => { setDeleteDialogVisible(false) }} autoFocus>
            No, I've changed my mind
          </Button>
          <Button fullWidth variant="outlined" color='error' onClick={deleteAccount}>Yes, delete my account</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
export default AccountSettings
