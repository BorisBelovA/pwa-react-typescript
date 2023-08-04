import { Box, Typography, useTheme } from '@mui/material'
import { type AuthUser, type QuestionnaireBasicType } from 'models'
import { useState } from 'react'
import { calculateAge } from 'src/utils/date-time'
import styles from './ProfileCard.module.scss'
import Badge from './Badge/Badge'
import Qualities from './Qualities/Qualities'
import NoPhotographyIcon from '@mui/icons-material/NoPhotography'
import SwipeUpIcon from '@mui/icons-material/SwipeUp'

interface Props {
  info: QuestionnaireBasicType
  person: AuthUser
}
const ProfileCard = (props: Props): JSX.Element => {
  const theme = useTheme()
  const [expanded, setExpanded] = useState(false)

  // const [scroll, setScroll] = useState<boolean>(false)
  // const [start, setStart] = useState<number>(0)
  const { info, person } = props
  const whoOptions = {
    Alone: 'By self',
    Friends: 'With friends',
    Couple: 'With partner',
    Family: 'With family',
    undefined: ''
  }
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

  return <Box className={styles.container}>
    <Box className={styles.background_image}
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
      {person.photo && <Box
        component='img'
        className={styles.image}
        src={person.photo ?? ''}
      />}

      {!person.photo &&
        <Box className={styles.no_image}>
          <NoPhotographyIcon fontSize='large'></NoPhotographyIcon>
          <Typography variant='h6'>No photo</Typography>
        </Box>
      }
    </Box>
    <Box className={`${styles.info} ${expanded ? styles.expanded : ''}`}>
      <Box className={styles.badges_container}>
        {info.havePets === true && <Badge type='pet' />}
        {!!info.apartment && <Badge type='house' />}
        {info.smoker === false && <Badge type='smokeFree' />}
      </Box>

      <Box className={styles.users_general_container}>
        <Box className={styles.users_general}>
          <Typography variant='h1' color='constantLight.main'>
            {person.firstName}, {person.birthday ? calculateAge(person.birthday) : 0}
          </Typography>
          <Typography color='constantLight.main'>{!!info.who ? whoOptions[info.who] : 'By self'}</Typography>
        </Box>
        <Box onClick={() => { setExpanded(!expanded) }}>
          <SwipeUpIcon fontSize='large'></SwipeUpIcon>
        </Box>
      </Box>

    </Box>
    <Box className={`${styles.description} ${expanded ? styles.expanded : ''}`}
      sx={{ backgroundColor: theme.palette.background.paper }}>
      <Qualities info={info} />
      <Typography variant='body2'>{info?.about}</Typography>
    </Box>
  </Box>
}
export default ProfileCard
