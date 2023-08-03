import { Box, Typography, useTheme } from '@mui/material'
import { type AuthUser, type QuestionnaireBasicType } from 'models'
import { useEffect, useState } from 'react'
import { calculateAge } from 'src/utils/date-time'
import styles from './CardBase.module.scss'
import Badge from '../../ProfileCard/Badge/Badge'
import Qualities from '../../ProfileCard/Qualities/Qualities'
import NoPhotographyIcon from '@mui/icons-material/NoPhotography'
import SwipeUpIcon from '@mui/icons-material/SwipeUp'

interface Props {
  header: JSX.Element
  content: JSX.Element
  photo?: string
}
const CardBase = ({header, content, photo}: Props) => {
  const theme = useTheme()
  const [expanded, setExpanded] = useState(false)

  const [scroll, setScroll] = useState<boolean>(false)
  const [start, setStart] = useState<number>(0)

  const handleScroll = (): void => {
    setScroll(!scroll)
  }

  // touch scrolling for info, need to add functionality
  // to prevent switching if content inside scrolled
  const onTouchStart = (e: TouchEvent): void => {
    setStart(e.touches[0].clientY)
  }
  const onTouchEnd = (e: TouchEvent): void => {
    start - e.changedTouches[0].clientY > 0 ? setScroll(true) : setScroll(false)
  }

  useEffect(() => {
    window.addEventListener('touchstart', onTouchStart)
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('touchmove', onTouchEnd)
    return () => {
      window.removeEventListener('touchmove', onTouchEnd)
    }
  })

  return (
    <Box className={styles.container}>
    <Box className={styles.background_image}
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
      {photo && <Box
        component='img'
        className={styles.image}
        src={photo ?? ''}
      />}

      {!photo &&
        <Box className={styles.no_image}>
          <NoPhotographyIcon fontSize='large'></NoPhotographyIcon>
          <Typography variant='h6'>No photo</Typography>
        </Box>
      }
    </Box>
    <Box className={`${styles.info} ${expanded ? styles.expanded : ''}`}>
      <Box className={styles.badges_container}>
        
      </Box>

      <Box className={styles.header_general_container}>
        <Box className={styles.header_general}>
          {header}
        </Box>
        <Box onClick={() => { setExpanded(!expanded) }}>
          <SwipeUpIcon fontSize='large'></SwipeUpIcon>
        </Box>
      </Box>

    </Box>
    <Box className={`${styles.description} ${expanded ? styles.expanded : ''}`}
      sx={{ backgroundColor: theme.palette.background.paper }}>
      {content}
    </Box>
  </Box>
  )
}
export default CardBase