import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined'
import { MyListItemButton as ListItemButton } from 'src/components/ListItemButton/ListItemButton'
import styles from './LanguagePicker.module.scss'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { type Direction, useDocumentDirection } from 'src/context/documentDirection'
import { useDocumentLanguage } from 'src/context/documentLanguage'
import { useNavigate } from 'react-router-dom'
import { t } from '@lingui/macro'

interface Props {
  inSettings?: boolean
}
const LanguagePicker = ({ inSettings }: Props): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)
  const { setDocumentDirection } = useDocumentDirection()
  const { setDocumentLanguage } = useDocumentLanguage()
  const navigate = useNavigate()

  const handleOpen = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => {
    setOpen(false)
  }

  const switchLanguage = async (lang: string, direction: Direction): Promise<void> => {
    await setDocumentLanguage(lang)
    setDocumentDirection(direction)
    handleClose()
    if (inSettings) {
      navigate('/profile/settings')
    }
  }

  return (
    <>
      {inSettings
        ? <ListItemButton label={t`Change language`}
          icon={TranslateOutlinedIcon}
          action={handleOpen}
        />
        : <IconButton onClick={handleOpen}><TranslateOutlinedIcon /></IconButton>
      }
      <Dialog onClose={handleClose} open={open} fullWidth>
        <DialogTitle className={styles.dialogHead}>
          <Typography variant='h2'>{t`Change language`}</Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ListItemButton
            label='English'
            action={() => { void switchLanguage('en', 'ltr') }}
          />
          <ListItemButton
            label='Hebrew (עִברִית)'
            action={() => { void switchLanguage('he', 'rtl') }}
          />
          <ListItemButton
            label='Russian (Русский)'
            action={() => { void switchLanguage('ru', 'ltr') }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
export default LanguagePicker
