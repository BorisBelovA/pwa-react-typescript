import { Box, IconButton, Avatar, Typography, useTheme, Menu, MenuItem, Skeleton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import styles from './ChatHeader.module.scss'
import { useState } from 'react'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder'
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff'
import { type AuthUser } from 'models'

interface ChatHeaderProps {
  user: AuthUser | null
}

export const ChatHeader = ({ user }: ChatHeaderProps): JSX.Element => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [chatMenuVisible, setChatMenuVisible] = useState(false)
  const [muteMenuVisible, setMuteMenuVisible] = useState(false)

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
  const navigate = useNavigate()

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
        }}>
      </Avatar>}

      <Box className={styles.user_name_container}>
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
      <MenuItem onClick={handleClose}><RemoveCircleOutlineIcon sx={{ marginRight: '0.5rem' }} ></RemoveCircleOutlineIcon>Ignore</MenuItem>
      <MenuItem onClick={() => {
        setChatMenuVisible(false)
        setMuteMenuVisible(true)
      }}><VolumeOffIcon sx={{ marginRight: '0.5rem' }}></VolumeOffIcon> Mute</MenuItem>
      <MenuItem onClick={handleClose}><SearchIcon sx={{ marginRight: '0.5rem' }}></SearchIcon> Search</MenuItem>
    </Menu>

    <Menu
      anchorEl={anchorEl}
      open={muteMenuVisible}
      onClose={closeMuteMenu}
    >
      <MenuItem onClick={backToMenu}><ArrowBackIcon sx={{ marginRight: '0.5rem' }}></ArrowBackIcon>Back</MenuItem>
      <MenuItem onClick={closeMuteMenu}><QueryBuilderIcon sx={{ marginRight: '0.5rem' }}></QueryBuilderIcon>30 minutes</MenuItem>
      <MenuItem onClick={closeMuteMenu}><QueryBuilderIcon sx={{ marginRight: '0.5rem' }}></QueryBuilderIcon>1 hour</MenuItem>
      <MenuItem onClick={closeMuteMenu}><QueryBuilderIcon sx={{ marginRight: '0.5rem' }}></QueryBuilderIcon>2 hours</MenuItem>
      <MenuItem onClick={closeMuteMenu}><QueryBuilderIcon sx={{ marginRight: '0.5rem' }}></QueryBuilderIcon>8 hours</MenuItem>
      <MenuItem sx={{ color: theme.palette.accent.main }}
        onClick={closeMuteMenu}>
          <NotificationsOffIcon sx={{ marginRight: '0.5rem' }}></NotificationsOffIcon>Mute forever
        </MenuItem>
    </Menu>
  </>
}
