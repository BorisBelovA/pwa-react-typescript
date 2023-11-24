import { Box, IconButton, Avatar, Typography, useTheme, Menu, MenuItem, Skeleton, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import styles from './ChatHeader.module.scss'
import { useState } from 'react'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff'
import { type QuestionnaireBasicType, type AuthUserWithEmail } from 'models'
import { useStore } from 'utils/StoreProvider'
import { observer } from 'mobx-react-lite'
import { ComplainDialog } from './ComplainDialog'
import { useMainContext } from 'layouts/Main/MainLayout'
import { feedbackService, questionnaireService } from 'api-services'
import CardProfile from 'components/Cards/CardProfile/CardProfile'
import { mapQuestionnaireToModel } from 'mapping-services'
import CardDualPA from 'components/Cards/CardDualPA/CardDualPA'
import { t } from '@lingui/macro'

interface ChatHeaderProps {
  user: AuthUserWithEmail | null
}

export const ChatHeader = observer(({ user }: ChatHeaderProps): JSX.Element => {
  const theme = useTheme()
  const { registrationStore } = useStore()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [chatMenuVisible, setChatMenuVisible] = useState(false)
  const [muteMenuVisible, setMuteMenuVisible] = useState(false)
  const [complainDialogVisible, setComplainDialogVisible] = useState<boolean>(false)
  const { setBackdropMessage, setBackdropVisible, setMessage } = useMainContext()
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireBasicType | null>(null)
  const [showProfileCard, setShowProfileCard] = useState<boolean>(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setChatMenuVisible(true)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setChatMenuVisible(false)
  }

  const closeMuteMenu = (): void => {
    setMuteMenuVisible(false)
  }

  const backToMenu = (): void => {
    closeMuteMenu()
    setChatMenuVisible(true)
  }

  const complain = async (message: string): Promise<void> => {
    setComplainDialogVisible(false)
    setBackdropVisible(true)
    setBackdropMessage(t`Sending your feedback!`)
    try {
      if (!user?.email || !registrationStore.email) {
        throw new Error(t`No pretension or sender email`)
      }
      await feedbackService.sendComplain(
        user?.email,
        registrationStore.email,
        message
      )
      setTimeout(() => {
        setMessage({
          text: t`We have received your feedback. Thank you!`,
          life: 5000,
          severity: 'success',
          visible: true
        })
        setBackdropVisible(false)
      }, 1500)
    } catch (e) {
      setMessage({
        text: e instanceof Error
          ? e.message
          : t`Something went wrong`,
        severity: 'error',
        visible: true,
        life: 5000
      })
      setBackdropVisible(false)
      setComplainDialogVisible(false)
    }
  }

  const onComplainDialogCancel = (): void => {
    setComplainDialogVisible(false)
  }

  const navigate = useNavigate()

  const onAvatarClick = async (): Promise<void> => {
    if (questionnaire) {
      setShowProfileCard(true)
      return
    }

    setBackdropMessage('')
    setBackdropVisible(true)
    if (!user) {
      throw new Error(t`No user`)
    }
    const result = await questionnaireService.getQuestionnaireByUserId(user.id)
    if (!result) {
      throw new Error(t`No result for user`)
    }
    setQuestionnaire(mapQuestionnaireToModel(result))
    setBackdropVisible(false)
    setShowProfileCard(true)
  }

  return <>
    <Box className={styles.chat_header}>
      <IconButton id={styles.back_button} aria-label="delete" size="small"
        onClick={() => {
          navigate(-1)
        }}>
        <ArrowBackIcon />
      </IconButton>
      {!user && <Skeleton variant='circular' animation="wave" width={36} height={36} />}
      {user &&
        <Avatar alt='Test avatar'
          src={user.avatar ?? ''}
          sx={{
            width: 36,
            height: 36,
            border: `2px solid ${theme.palette.background.default}`
          }}
          onClick={() => { void onAvatarClick() }}>
        </Avatar>}

      <Box className={styles.user_name_container}
          onClick={() => { void onAvatarClick() }}>
        {!user && <Skeleton animation="wave" width={'50%'} />}
        {user && <Typography id={styles.user_name} variant='body1'>{user.firstName} {user.lastName}</Typography>}

        {/* Для лучших времен, когда научимся определять пишет ли собеседник */}
        {/* <Box className={styles.typing_indicator}
          sx={{
            color: theme.palette.primary.main
          }}>
          <small>typing</small>
          <small className={styles.typing__dot}>.</small>
          <small className={styles.typing__dot}>.</small>
          <small className={styles.typing__dot}>.</small>
        </Box> */}
      </Box>

      <IconButton id={styles.more_button} aria-label="delete" size="small" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
    </Box>

    <Menu
      anchorEl={anchorEl}
      open={chatMenuVisible}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}><RemoveCircleOutlineIcon className={styles.menuItemIcon}/>{t`Ignore`}</MenuItem>
      <MenuItem onClick={() => {
        setComplainDialogVisible(true)
        handleClose()
      }}><ThumbDownOffAltIcon className={styles.menuItemIcon}/>{t`Complain`}</MenuItem>
      <MenuItem onClick={() => {
        setChatMenuVisible(false)
        setMuteMenuVisible(true)
      }}><VolumeOffIcon className={styles.menuItemIcon}/>{t`Mute`}</MenuItem>
      <MenuItem onClick={handleClose}><SearchIcon className={styles.menuItemIcon}/>{t`Search`}</MenuItem>
    </Menu>

    <Menu
      anchorEl={anchorEl}
      open={muteMenuVisible}
      onClose={closeMuteMenu}
    >
      <MenuItem onClick={backToMenu}><ArrowBackIcon className={styles.menuItemIcon}></ArrowBackIcon>{t`Back`}</MenuItem>
      <MenuItem onClick={closeMuteMenu}><QueryBuilderIcon className={styles.menuItemIcon}></QueryBuilderIcon>{t`30 minutes`}</MenuItem>
      <MenuItem onClick={closeMuteMenu}><QueryBuilderIcon className={styles.menuItemIcon}></QueryBuilderIcon>{t`1 hour`}</MenuItem>
      <MenuItem onClick={closeMuteMenu}><QueryBuilderIcon className={styles.menuItemIcon}></QueryBuilderIcon>{t`2 hours`}</MenuItem>
      <MenuItem onClick={closeMuteMenu}><QueryBuilderIcon className={styles.menuItemIcon}></QueryBuilderIcon>{t`8 hours`}</MenuItem>
      <MenuItem sx={{ color: theme.palette.accent.main }}
        onClick={closeMuteMenu}>
        <NotificationsOffIcon className={styles.menuItemIcon}></NotificationsOffIcon>{t`Mute forever`}
      </MenuItem>
    </Menu>

    <ComplainDialog visible={complainDialogVisible}
      sendComplainCallback={complain}
      closeDialog={onComplainDialogCancel} />

    {showProfileCard && user && questionnaire && <>
      <Box className={styles.card_container_mask}></Box>
      <Box className={styles.card_container}>
        {
          questionnaire.apartment?.id
            ? <CardDualPA match={{ user, form: questionnaire }} padding={'1rem'}/>
            : <CardProfile person={user} info={questionnaire} />
        }
        <Button variant="outlined" fullWidth onClick={() => { setShowProfileCard(false) }}>
          {t`Back to chat`}
        </Button>
      </Box>
    </>}
  </>
})
