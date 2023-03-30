import { Box, IconButton, Paper, Typography } from '@mui/material'
import { type QuestionnaireBasicType, type User } from 'models'
import { useState } from 'react'
import { calculateAge } from 'src/utils/date-time'
import styles from './ProfileCard.module.scss'
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded'
import Badge from './Badge/Badge'

interface Props {
  info: QuestionnaireBasicType
  person: User
}
const ProfileCard = (props: Props): JSX.Element => {
  const [scroll, setScroll] = useState<boolean>(false)
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
            <Typography variant='h1'>{person.firstName}, {calculateAge(person.birthday)}</Typography>
            <Typography>{info.who !== undefined ? whoOptions[info.who] : 'By self'}</Typography>
          </Box>
          <IconButton onClick={handleScroll}>
            <KeyboardDoubleArrowDownRoundedIcon
              sx={{ color: 'white' }}
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
          <Typography>{info?.about}</Typography>
        </Box>
      </Box>
      <Box className={styles.profileCard__hide} />
    </>
  )
}
export default ProfileCard
