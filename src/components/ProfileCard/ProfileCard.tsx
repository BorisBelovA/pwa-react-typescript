import { Box, IconButton, Paper, Typography } from '@mui/material'
import { type QuestionnaireBasicType, type User } from 'models'
import { useEffect, useState } from 'react'
import { calculateAge } from 'src/utils/date-time'
import styles from './ProfileCard.module.scss'
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded'
import Badge from './Badge/Badge'
import Qualities from './Qualities/Qualities'

interface Props {
  info: QuestionnaireBasicType
  person: User
}
const ProfileCard = (props: Props): JSX.Element => {
  const [scroll, setScroll] = useState<boolean>(false)
  const [start, setStart] = useState<number>(0)
  const { info, person } = props
  const whoOptions = {
    Alone: 'By self',
    Friends: 'With friends',
    Couple: 'With partner',
    Family: 'With family',
    undefined: ''
  }
  const handleScroll = (): void => {
    setScroll(!scroll)
  }

  const onTouchStart = (e: TouchEvent) => {
    setStart(e.touches[0].clientY)
  }
  const onTouchEnd = (e: TouchEvent) => {
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
    <>
      <Paper className={styles.profileCard}>
        <Box
          component='img'
          className={styles.profileCard__photo}
          src={require(`../../assets/temp/people/${person.photo !== null && person.photo !== '' ? person.photo : '1.jpg'}`)}
        />
        <Box className={`${styles.profileCard__person}  ${scroll ? styles.profileCard__person_scroll : ''}`}>
          <Box className={styles.profileCard__personTexts}>
            <Typography variant='h1' color='constantLight.main'>{person.firstName}, {calculateAge(person.birthday)}</Typography>
            <Typography color='constantLight.main'>{info.who !== undefined ? whoOptions[info.who] : 'By self'} {start}</Typography>
          </Box>
          <IconButton onClick={handleScroll}>
            <KeyboardDoubleArrowDownRoundedIcon
              sx={{ color: 'constantLight.main' }}
              fontSize='large'
              className={`${styles.profileCard__personButton} ${scroll ? '' : styles.profileCard__personButtonIcon}`}
            />
          </IconButton>
          <Box className={styles.profileCard__personBadges}>
            {info.havePets === true && <Badge type='pet' />}
            {info.apartment === true && <Badge type='house' />}
            {info.smoker === false && <Badge type='smokeFree' />}
          </Box>
        </Box>
      </Paper>
      <Box className={`${styles.profileCard__contentBox} ${scroll ? styles.profileCard__contentBox_scroll : ''}`}>
        <Box className={styles.profileCard__content}>
          <Qualities info={info} />
          <Typography variant='body2'>{info?.about}</Typography>
        </Box>
      </Box>
      <Box className={styles.profileCard__hide} />
    </>
  )
}
export default ProfileCard
