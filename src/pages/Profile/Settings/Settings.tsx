import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material'
import styles from '../Profile.module.scss'
import settignsStyles from './Settings.module.scss'
import BackButton from 'src/components/Buttons/BackButton/BackButton'
import { MyListItemButton as ListItemButton } from 'src/components/ListItemButton/ListItemButton'
import AddToHomeScreenOutlinedIcon from '@mui/icons-material/AddToHomeScreenOutlined'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export function useAddToHomescreenPrompt(): [
  IBeforeInstallPromptEvent | null,
  () => void,
  (arg: IBeforeInstallPromptEvent | null) => void
] {
  const [prompt, setPrompt] = useState<IBeforeInstallPromptEvent | null>(
    null
  )

  const promptToInstall = () => {
    if (prompt) {
      return prompt.prompt()
    }
    return Promise.reject(
      new Error(
        'Tried installing before browser sent \'beforeinstallprompt\' event'
      )
    )
  }

  useEffect(() => {
    const ready = (e: IBeforeInstallPromptEvent) => {
      e.preventDefault()
      setPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', ready as any)

    return () => {
      window.removeEventListener('beforeinstallprompt', ready as any)
    }
  }, [])

  return [prompt, promptToInstall, setPrompt]
}

export function usePwaAppInstalled (): [
  boolean,
] {
  const [appInstalled, setAppInstalled] = useState<boolean>(false)

  useEffect(() => {
    const installed = () => {
      alert('app installed')
      setAppInstalled(true)
    }

    window.addEventListener('appinstalled', installed as any)

    return () => {
      window.removeEventListener('appinstalled', installed as any)
    }
  }, [])

  return [appInstalled]
}

export function useDetectDevice () {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  const navigatorStandAlone = 'standalone' in navigator && navigator.standalone
  const [type, setType] = useState<'pwa' | 'standalone' | 'browser'>('browser')
  useEffect(() => {
    if (document.referrer.startsWith('android-app://')) {
      setType('pwa');
      return
    }
    if (!!navigatorStandAlone || isStandalone) {
      setType('standalone');
      return
    }
    setType('browser');
  }, [])

  return [type]
}

const Settings = (): JSX.Element => {
  const navigate = useNavigate()
  const [prompt, promptToInstall, setPrompt] = useAddToHomescreenPrompt()
  const [installPromptVisible, setInstallPromptVisible] = useState(false)
  const [deviceType] = useDetectDevice()
  const onInstallClick = async () => {
    // Hide the app provided install promotion
    // hideInstallPromotion()
    // Show the install prompt

    // if (!deferredPrompt) {
    //   return
    // }

    // deferredPrompt.prompt()
    // // Wait for the user to respond to the prompt
    // const { outcome } = await deferredPrompt?.userChoice
    // // Optionally, send analytics event with outcome of user choice
    // console.log(`User response to the install prompt: ${outcome}`)
    // // We've used the prompt, and can't use it again, throw it away
    // deferredPrompt = null
    setInstallPromptVisible(false)
    promptToInstall()
    setPrompt(null)
  }

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
        { deviceType === 'browser' && !!prompt &&
          <ListItemButton label='Add to Home Screen'
            icon={AddToHomeScreenOutlinedIcon}
            action={() => { setInstallPromptVisible(true) }}
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
  </>
  )
}
export default Settings
