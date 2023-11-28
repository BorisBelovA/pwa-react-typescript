import { Box, Skeleton, Typography } from '@mui/material'
import commonStyles from '../../Profile.module.scss'
import BackButton from 'components/Buttons/BackButton/BackButton'
import CardProfile from 'components/Cards/CardProfile/CardProfile'
import { useStore } from 'utils/StoreProvider'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import ReactCardFlip from 'react-card-flip'
import CardApartment from 'components/Cards/CardApartment/CardApartment'
import styles from './Preview.module.scss'
import { Trans, t } from '@lingui/macro'

const Preview = (): JSX.Element => {
  const { questionnaireStore, userStore } = useStore()
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const whoOptions = {
    Alone: t({ message: 'By self' }),
    Friends: t({ message: 'With friends' }),
    Couple: t({ message: 'With partner' }),
    Family: t({ message: 'With family' }),
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
        <Typography variant='h1'>
          <Trans>Your profile</Trans>
        </Typography>
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
              editable
              who={!!questionnaireStore.questionnaire.who
                ? whoOptions[questionnaireStore.questionnaire.who]
                : t({ message: 'By self' })
              }
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
