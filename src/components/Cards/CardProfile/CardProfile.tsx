import { Box, IconButton, Typography, useTheme } from '@mui/material'
import styles from './CardProfile.module.scss'
import CardBase from '../CardBase/CardBase'
import { ProfileRoutes, type AuthUser, type QuestionnaireBasicType, QuestionnaireRoutes } from 'models'
import { type Badges } from 'src/models/badges'
import { calculateAge } from 'src/utils/date-time'
import Qualities from 'src/components/Qualities/Qualities'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'

interface Props {
  info: QuestionnaireBasicType
  person: AuthUser
  padding?: string
  editable?: boolean

}
const CardProfile = (props: Props): JSX.Element => {
  const navigate = useNavigate()
  const theme = useTheme()
  const { info, person, padding, editable } = props
  const whoOptions = {
    Alone: 'By self',
    Friends: 'With friends',
    Couple: 'With partner',
    Family: 'With family',
    undefined: ''
  }

  const badges = (): Badges[] => {
    const list: Badges[] = []
    info?.havePets === true && list.push('pet')
    !!info?.apartment && list.push('house')
    info?.smoker === false && list.push('smokeFree')
    return list
  }

  const header = (
    <>
      <Box className={styles.head__bio}>
        <Typography variant='h1' color='constantLight.main'>
          {`${person.firstName}, ${person.birthday ? calculateAge(person.birthday) : 0}`}
        </Typography>
        {editable &&
          <IconButton sx={{ color: theme.palette.primary.main }}
            className={styles.icon__edit}
            size='small'
            aria-label="edit"
            onClick={() => { navigate(`/profile/${ProfileRoutes.ABOUT_ME}/${ProfileRoutes.BASIC_INFO}`) }}>
            <EditIcon fontSize='small' />
            <Typography fontSize={14} marginLeft='0.5rem'>Edit</Typography>
          </IconButton>
        }
      </Box>
      <Typography variant='body1' className={styles.head} color='constantLight.main'>
        {!!info.who ? whoOptions[info.who] : 'By self'}
      </Typography>
    </>
  )

  const content = (
    <>
      <Box className={styles.content__qualities}>
        <Qualities info={info} />
        {editable &&
          <Box>
            <IconButton sx={{ color: theme.palette.primary.main }}
              size='small'
              aria-label="edit"
              onClick={() => { navigate(`/profile/${ProfileRoutes.BASIC_QUEST}/${QuestionnaireRoutes.WHO}`) }}>
              <EditIcon fontSize='small' />
              <Typography fontSize={14} marginLeft='0.5rem'>Edit</Typography>
            </IconButton>
          </Box>
        }
      </Box>
      <Typography variant='body2'>{info?.about}</Typography>
    </>
  )

  return (
    <CardBase header={header} content={content} badges={badges()} photo={person.photo ?? ''} padding={padding} />
  )
}
export default CardProfile
