import { Typography } from '@mui/material'
import CardBase from 'src/components/Cards/CardBase/CardBase'
import styles from './Testing.module.scss'
import CardProfile from 'src/components/Cards/CardProfile/CardProfile'
import { useStore } from 'src/utils/StoreProvider'
import { QuestionnaireBasicType } from 'models'

const Testing = (): JSX.Element => {
  const { userStore } = useStore()

  const qu: QuestionnaireBasicType = {
    id: 100,
    who: 'Alone',
    about: '',
    countKids: 0,
    countAdults: 1,
    smoker: false,
    smokingWhat: [],
    languages: ['English', 'Russian'],
    sleepingHabits: 'Owl',
    alcohol: 'ARBUSER',
    apartment: null,
    guests: 'No guests at all',
    location: {
      city: {
        id: 0,
        name: 'Madrid'
      },
      country: {
        id: 1,
        name: 'Spain',
        emoji: ''
      },
      state: {
        id: 1,
        name: ''
      }
    }
  }

  return (
    <>
      <Typography variant='h1' className={styles.header}>Your profile</Typography>
      <CardProfile info={qu} person={userStore} />
    </>
  )
}
export default Testing
