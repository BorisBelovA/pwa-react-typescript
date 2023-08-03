import { Typography, useTheme } from '@mui/material'
import styles from './CardMyProfile.module.scss'
import CardBase from '../CardBase/CardBase'
import { useEffect} from 'react'
import { Badges } from 'src/models/badges'
import { calculateAge } from 'src/utils/date-time'
import Qualities from 'src/components/ProfileCard/Qualities/Qualities'
import { useStore } from 'src/utils/StoreProvider'
import { observer } from 'mobx-react-lite'

const CardMyProfile = () => {
  const { questionnaireStore, userStore } = useStore()
  const whoOptions = {
    Alone: 'By self',
    Friends: 'With friends',
    Couple: 'With partner',
    Family: 'With family',
    undefined: ''
  }

  let badges = (): Badges[] => {
    let list: Badges[] = []
    questionnaireStore.questionnaire?.havePets === true && list.push('pet')
    !!questionnaireStore.questionnaire?.apartment && list.push('house')
    questionnaireStore.questionnaire?.smoker === false && list.push('smokeFree')
    return list
  }

  useEffect(() => {
    questionnaireStore.getQuestionnaire()
  }, [])
    

  const header = (
    <>
      <Typography variant='h1' color='constantLight.main'>{`${userStore.firstName}, ${userStore.birthday ? calculateAge(userStore.birthday) : 0}`}</Typography>
      <Typography variant='body1' className={styles.head} color='constantLight.main'>{!!questionnaireStore.questionnaire?.who ? whoOptions[questionnaireStore.questionnaire?.who] : 'By self'}</Typography>
    </>
  )

  const content = (
    <>
      <Qualities info={questionnaireStore.questionnaire} />
      <Typography variant='body2'>{questionnaireStore.questionnaire?.about}</Typography>
    </>
  )

  return (
    <CardBase header={header} content={content} badges={badges()} photo={userStore.photo ?? ''} />
  )
}
export default observer(CardMyProfile)