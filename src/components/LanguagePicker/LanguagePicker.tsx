import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import { MyListItemButton as ListItemButton } from 'components/ListItemButton/ListItemButton'
import styles from './LanguagePicker.module.scss'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { type Direction, useDocumentDirection } from 'context/documentDirection'
import { useDocumentLanguage } from 'context/documentLanguage'
import { useNavigate } from 'react-router-dom'
import { t } from '@lingui/macro'
import LanguageIcon from '@mui/icons-material/Language'

interface Props {
  children?: JSX.Element
}
const LanguagePicker = ({ children }: Props): JSX.Element => {
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
    navigate(0)
  }

  return (
    <>
      {children
        ? <Box onClick={handleOpen}>{children}</Box>
        : <Box className={styles.pickButton}>
          <IconButton onClick={handleOpen} color='primary'><LanguageIcon /></IconButton>
        </Box>
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
