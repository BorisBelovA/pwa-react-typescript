import { Box, IconButton, Typography, useTheme } from '@mui/material'
import styles from './CardMyProfile.module.scss'
import CardBase from '../CardBase/CardBase'
import { useEffect } from 'react'
import { type Badges } from 'src/models/badges'
import { calculateAge } from 'src/utils/date-time'
import Qualities from 'src/components/Qualities/Qualities'
import { useStore } from 'src/utils/StoreProvider'
import { observer } from 'mobx-react-lite'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router'
import { ProfileRoutes, QuestionnaireRoutes } from 'models'

const CardMyProfile = (): JSX.Element => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { questionnaireStore, userStore } = useStore()
  const whoOptions = {
    Alone: 'By self',
    Friends: 'With friends',
    Couple: 'With partner',
    Family: 'With family',
    undefined: ''
  }

  const badges = (): Badges[] => {
    const list: Badges[] = []
    questionnaireStore.questionnaire?.havePets === true && list.push('pet')
    !!questionnaireStore.questionnaire?.apartment && list.push('house')
    questionnaireStore.questionnaire?.smoker === false && list.push('smokeFree')
    return list
  }

  useEffect(() => {
    void questionnaireStore.getQuestionnaire()
  }, [])

  const header = (
    <>
      <Box className={styles.head__bio}>
        <Typography
          variant='h1'
          color='constantLight.main'>
          {`${userStore.firstName}, ${userStore.birthday ? calculateAge(userStore.birthday) : 0}`}
        </Typography>
        <IconButton sx={{ color: theme.palette.primary.main }}
          size='small'
          aria-label="edit"
          onClick={() => { navigate(`/profile/${ProfileRoutes.ABOUT_ME}/${ProfileRoutes.BASIC_INFO}`) }}>
          <EditIcon fontSize='small' />
          <Typography fontSize={14} marginLeft='0.5rem'>Edit</Typography>
        </IconButton>
      </Box>
      <Typography
        variant='body1'
        className={styles.head}
        color='constantLight.main'>
        {!!questionnaireStore.questionnaire?.who ? whoOptions[questionnaireStore.questionnaire?.who] : 'By self'}
      </Typography>
    </>
  )

  const content = (
    <>
      <Box className={styles.content__qualities}>
        <Qualities info={questionnaireStore.questionnaire} />
        <Box>
          <IconButton sx={{ color: theme.palette.primary.main }}
            size='small'
            aria-label="edit"
            onClick={() => { navigate(`/profile/${ProfileRoutes.BASIC_QUEST}/${QuestionnaireRoutes.WHO}`) }}>
            <EditIcon fontSize='small' />
            <Typography fontSize={14} marginLeft='0.5rem'>Edit</Typography>
          </IconButton>
        </Box>
      </Box>
      <Typography variant='body2'>{questionnaireStore.questionnaire?.about}</Typography>
    </>
  )

  return (
    <CardBase header={header} content={content} badges={badges()} photo={userStore.photo ?? ''} />
  )
}
export default observer(CardMyProfile)
