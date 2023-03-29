import { Box, Paper, Typography } from '@mui/material'
import { type QuestionnaireBasicType, type User } from 'models'
import { useState } from 'react'
import { calculateAge } from 'src/utils/date-time'
import styles from './ProfileCard.module.scss'

interface Props {
  info: QuestionnaireBasicType
  person: User
}
const ProfileCard = (props: Props): JSX.Element => {
  const [scroll, setScroll] = useState<boolean>(false)
  const { info, person } = props

  const handleScroll = (): void => {
    setScroll(!scroll)
  }
  return (
    <>
      <Paper className={styles.profileCard} onClick={handleScroll}>
        <Box component='img' className={styles.profileCard__photo} src={require(`../../assets/temp/people/${person.photo ?? '' ? person.photo : '1.jpg'}`)} />
        <Box className={`${styles.profileCard__person}  ${scroll ? styles.profileCard__person_scroll : ''}`}>
          <Box className={styles.profileCard__personTexts}>
            <Typography color='Background' variant='h1'>{person.firstName}, {calculateAge(person.birthday)}</Typography>
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
