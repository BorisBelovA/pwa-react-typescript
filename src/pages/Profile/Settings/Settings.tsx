import {
  Backdrop,
  Box,
  Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, useTheme
} from '@mui/material'
import styles from '../Profile.module.scss'
import settignsStyles from './Settings.module.scss'
import BackButton from 'src/components/Buttons/BackButton/BackButton'
import { MyListItemButton as ListItemButton } from 'src/components/ListItemButton/ListItemButton'
import AddToHomeScreenOutlinedIcon from '@mui/icons-material/AddToHomeScreenOutlined'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { usePromptToInstall } from 'src/context/promptToInstall'
import { useDetectDevice } from 'src/effects/detectDevice'
import { useDetectBrowser } from 'src/effects/detectBrowser'
import { InstallationInstruction } from './InstallationInstruction/InstallationInstruction'

const Settings = (): JSX.Element => {
  const navigate = useNavigate()
  const { deferredEvt, hidePrompt } = usePromptToInstall()
  const [installPromptVisible, setInstallPromptVisible] = useState(false)
  const [deviceType] = useDetectDevice()
  const browser = useDetectBrowser()
  const [instructionVisible, setInstructionVisible] = useState<boolean>(false)
  const theme = useTheme()
  const onInstallClick = async (): Promise<void> => {
    setInstallPromptVisible(false)
    if (deferredEvt) {
      void deferredEvt.prompt()
      hidePrompt()
    }
  }

  const installBtnVisible = useMemo(() => {
    return deviceType === 'browser' &&
      (browser === 'Chrome' || browser === 'Safari' || browser === 'Edge')
  }, [deviceType, browser])

  return (<>
    <Box className={styles.profile__container}>
      <Box className={styles.profile__header}>
        <BackButton />
        <Typography variant='h1'>Settings</Typography>
      </Box>
      <Box className={settignsStyles.settings_container}>
        <ListItemButton label='Account'
          icon={ManageAccountsOutlinedIcon}
          action={() => { navigate('/profile/settings/account/') }}
        />
        <ListItemButton label='Color theme'
          icon={PaletteOutlinedIcon}
          action={() => { navigate('/profile/settings/theme/') }}
        />
        {installBtnVisible &&
          <ListItemButton label='Add to Home Screen'
            icon={AddToHomeScreenOutlinedIcon}
            action={() => {
              if (browser === 'Chrome' || browser === 'Edge') {
                setInstallPromptVisible(true)
              }
              if (browser === 'Safari') {
                setInstructionVisible(true)
              }
            }}
          />
        }
      </Box>
    </Box>

    <Dialog
      open={installPromptVisible}
      onClose={() => { setInstallPromptVisible(false) }}>
      <DialogTitle>Add Roommate to your home screen</DialogTitle>
      <DialogContent>
        <DialogContentText>Do you want to install Roommate on your home screen?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { setInstallPromptVisible(false) }}>No</Button>
        <Button onClick={() => { void onInstallClick() }} autoFocus>Yes</Button>
      </DialogActions>
    </Dialog>

    {instructionVisible &&
      <Backdrop
        sx={{
          backgroundColor: theme.palette.background.default,
          zIndex: 9999
        }}
        open={instructionVisible}
        onClick={() => { setInstructionVisible(false) }}>
        <InstallationInstruction />
      </Backdrop>
    }
  </>
  )
}
export default Settings
