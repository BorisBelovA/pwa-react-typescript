import { Typography, useTheme } from '@mui/material'
import styles from './CardProfile.module.scss'
import CardBase from '../CardBase/CardBase'
import { AuthUser, QuestionnaireBasicType } from 'models'
import { useState } from 'react'
import { Badges } from 'src/models/badges'
import { calculateAge } from 'src/utils/date-time'
import Qualities from 'src/components/ProfileCard/Qualities/Qualities'

interface Props {
  info: QuestionnaireBasicType
  person: AuthUser
}
const CardProfile = (props: Props) => {
  const { info, person } = props
  const whoOptions = {
    Alone: 'By self',
    Friends: 'With friends',
    Couple: 'With partner',
    Family: 'With family',
    undefined: ''
  }

  let badges = (): Badges[] => {
    let list: Badges[] = []
    info?.havePets === true && list.push('pet')
    !!info?.apartment && list.push('house')
    info?.smoker === false && list.push('smokeFree')
    return list
  }

  const header = (
    <>
      <Typography variant='h1' color='constantLight.main'>{`${person.firstName}, ${person.birthday ? calculateAge(person.birthday) : 0}`}</Typography>
      <Typography variant='body1' className={styles.head} color='constantLight.main'>{!!info.who ? whoOptions[info.who] : 'By self'}</Typography>
    </>
  )

  const content = (
    <>
      <Qualities info={info} />
      <Typography variant='body2'>{info?.about}</Typography>
    </>
  )

  return (
    <CardBase header={header} content={content} badges={badges()} photo={person.photo ?? ''} />
  )
}
export default CardProfile