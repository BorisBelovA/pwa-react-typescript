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
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined'
import { i18n } from '@lingui/core'
import { Trans, msg, t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useDocumentDirection } from 'src/context/documentDirection'
import { useDocumentLanguage } from 'src/context/documentLanguage'

const Settings = (): JSX.Element => {
  const navigate = useNavigate()
  const { deferredEvt, hidePrompt } = usePromptToInstall()
  const [installPromptVisible, setInstallPromptVisible] = useState(false)
  const [deviceType] = useDetectDevice()
  const browser = useDetectBrowser()
  const [instructionVisible, setInstructionVisible] = useState<boolean>(false)
  const theme = useTheme()
  const { _ } = useLingui()
  const { setDocumentDirection } = useDocumentDirection()
  const { setDocumentLanguage } = useDocumentLanguage()

  const onInstallClick = async (): Promise<void> => {
    setInstallPromptVisible(false)
    if (deferredEvt) {
      void deferredEvt.prompt()
      hidePrompt()
    }
  }

  const switchLanguage = async (): Promise<void> => {
    if (i18n.locale === 'en') {
      await setDocumentLanguage('he')
      setDocumentDirection('rtl')
    } else {
      await setDocumentLanguage('en')
      setDocumentDirection('ltr') 
    }
    navigate('/profile/settings')
  }

  const switchToLanguageButtonText = useMemo(() => {
    return i18n.locale === 'en'
      ? t({ message: 'Switch to Hebrew' })
      : t({ message: 'Switch to English' })
  }, [i18n.locale])

  const installBtnVisible = useMemo(() => {
    return deviceType === 'browser' &&
      (browser === 'Chrome' || browser === 'Safari' || browser === 'Edge')
  }, [deviceType, browser])

  return (<>
    <Box className={styles.profile__container}>
      <Box className={styles.profile__header}>
        <BackButton />
        <Typography variant='h1'><Trans>Settings</Trans></Typography>
      </Box>
      <Box className={settignsStyles.settings_container}>
        <ListItemButton label={_(msg`Account`)}
          icon={ManageAccountsOutlinedIcon}
          action={() => { navigate('/profile/settings/account/') }}
        />
        <ListItemButton label={_(msg`Color theme`)}
          icon={PaletteOutlinedIcon}
          action={() => { navigate('/profile/settings/theme/') }}
        />
        <ListItemButton label={switchToLanguageButtonText}
          icon={TranslateOutlinedIcon}
          action={switchLanguage}
        />
        {installBtnVisible &&
          <ListItemButton label={_(msg`Add to Home Screen`)}
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
      <DialogTitle>
        <Trans>Add &quot;Roommate&quot; to your home screen</Trans>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Trans>Do you want to install &quot;Roommate&quot; on your home screen?</Trans>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { setInstallPromptVisible(false) }}>
          <Trans>No</Trans>
        </Button>
        <Button onClick={() => { void onInstallClick() }} autoFocus>
          <Trans>Yes</Trans>
        </Button>
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
