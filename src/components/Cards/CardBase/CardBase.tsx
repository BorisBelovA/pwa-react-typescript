import { Box, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import styles from './CardBase.module.scss'
import Badge from '../../Badge/Badge'
import NoPhotographyIcon from '@mui/icons-material/NoPhotography'
import SwipeUpIcon from '@mui/icons-material/SwipeUp'
import { type Badges } from 'src/models/badges'
import { t } from '@lingui/macro'

interface Props {
  header: JSX.Element
  content: JSX.Element
  photo?: string[]
  badges?: Badges[]
  padding?: string
}
const CardBase = ({ header, content, photo, badges, padding }: Props): JSX.Element => {
  const theme = useTheme()
  const [photoIndex, setPhotoIndex] = useState<number>(0)
  const [expanded, setExpanded] = useState(false)

  // const [scroll, setScroll] = useState<boolean>(false)
  // const [start, setStart] = useState<number>(0)

  // const handleScroll = (): void => {
  //   setScroll(!scroll)
  // }

  // touch scrolling for info, need to add functionality
  // to prevent switching if content inside scrolled
  // const onTouchStart = (e: TouchEvent): void => {
  //   setStart(e.touches[0].clientY)
  // }
  // const onTouchEnd = (e: TouchEvent): void => {
  //   start - e.changedTouches[0].clientY > 0 ? setScroll(true) : setScroll(false)
  // }

  // useEffect(() => {
  //   window.addEventListener('touchstart', onTouchStart)
  //   return () => {
  //     window.removeEventListener('touchstart', onTouchStart)
  //   }
  // }, [])

  // useEffect(() => {
  //   window.addEventListener('touchmove', onTouchEnd)
  //   return () => {
  //     window.removeEventListener('touchmove', onTouchEnd)
  //   }
  // })
  const nextPhoto = (max: number): void => {
    photoIndex !== max - 1
      ? setPhotoIndex(photoIndex + 1)
      : setPhotoIndex(0)
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.background_image}
        sx={{ backgroundColor: theme.palette.background.paper }}
      >
        {!photo?.[0]
          ? <Box className={styles.no_image}>
            <NoPhotographyIcon fontSize='large'></NoPhotographyIcon>
            <Typography variant='h6'>{t`No photo`}</Typography>
          </Box>
          : photo.length > 1
            ? <>
              <Box className={styles.photoSlider}>
                {
                  photo.map((photo, index) => (
                    <Box
                      className={`${styles.photoSlider__point} ${index === photoIndex && styles.photoSlider__point_active}`}
                      key={index} />
                  ))
                }
              </Box>
              <Box
                onClick={() => { nextPhoto(photo.length) }}
                component='img'
                className={styles.image}
                src={photo[photoIndex] ?? ''}
              />
            </>
            : <Box
              component='img'
              className={styles.image}
              src={photo[0] ?? ''}
            />
        }
      </Box>
      <Box className={`${styles.info}`}>
        <Box className={styles.badges_container}>
          {badges?.map((badge, i) => (
            <Badge type={badge} key={i} />
          ))}
        </Box>

        <Box
          className={`${styles.header}  ${expanded ? styles.expanded : ''}`}
          style={{ '--header-padding': padding ?? '1rem' } as React.CSSProperties}>
          <Box className={`${styles.header_general}`}>
            {header}
          </Box>
          <Box onClick={() => { setExpanded(!expanded) }}>
            <SwipeUpIcon fontSize='large' className={styles.icon__swipe} />
          </Box>
        </Box>
        <Box className={`${styles.description} ${expanded ? styles.expanded : ''}`}
          sx={{ backgroundColor: theme.palette.background.paper }}>
          <Box className={styles.description__content}>{content}</Box>
        </Box>

      </Box>

    </Box>
  )
}
export default CardBase
