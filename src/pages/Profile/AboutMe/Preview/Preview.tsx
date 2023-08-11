import { Box, Skeleton, Typography } from '@mui/material'
import commonStyles from '../../Profile.module.scss'
import BackButton from 'src/components/Buttons/BackButton/BackButton'
import CardProfile from 'src/components/Cards/CardProfile/CardProfile'
import { useStore } from 'src/utils/StoreProvider'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import ReactCardFlip from 'react-card-flip'
import CardApartment from 'src/components/Cards/CardApartment/CardApartment'
import styles from './Preview.module.scss'

const Preview = (): JSX.Element => {
  const { questionnaireStore, userStore } = useStore()
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const whoOptions = {
    Alone: 'By self',
    Friends: 'With friends',
    Couple: 'With partner',
    Family: 'With family',
    undefined: ''
  }
  useEffect(() => {
    void questionnaireStore.getQuestionnaire()
  }, [])

  const handleFlip = (): void => {
    setIsFlipped(!isFlipped)
  }

  return (
    <>
      <Box className={commonStyles.profile__header}>
        <BackButton />
        <Typography variant='h1'>Your profile</Typography>
      </Box>
      {questionnaireStore.questionnaire
        ? questionnaireStore.questionnaire.apartment?.id
          ? <ReactCardFlip isFlipped={isFlipped} containerClassName={styles.flip__container}>
            <CardProfile
              info={questionnaireStore.questionnaire}
              person={userStore}
              editable
              flipCard={handleFlip}
            />
            <CardApartment
              apartment={questionnaireStore.questionnaire.apartment}
              user={userStore}
              flipCard={handleFlip}
              who={!!questionnaireStore.questionnaire.who ? whoOptions[questionnaireStore.questionnaire.who] : 'By self'}
            />
          </ReactCardFlip>
          : <CardProfile
            info={questionnaireStore.questionnaire}
            person={userStore}
            editable
          />
        : <Skeleton variant="rounded" width={'100%'} height={'100%'} sx={{ marginTop: '1rem', borderRadius: '1rem' }} />
      }
    </>
  )
}
export default observer(Preview)
