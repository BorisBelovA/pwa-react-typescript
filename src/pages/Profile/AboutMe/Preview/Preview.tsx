import { Box, Skeleton, Typography } from '@mui/material'
import commonStyles from '../../Profile.module.scss'
import BackButton from 'src/components/Buttons/BackButton/BackButton'
import CardProfile from 'src/components/Cards/CardProfile/CardProfile'
import { useStore } from 'src/utils/StoreProvider'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

const Preview = (): JSX.Element => {
  const { questionnaireStore, userStore } = useStore()

  useEffect(() => {
    void questionnaireStore.getQuestionnaire()
  }, [])

  return (
    <>
      <Box className={commonStyles.profile__header}>
        <BackButton />
        <Typography variant='h1'>Your profile</Typography>
      </Box>
      {questionnaireStore.questionnaire
        ? <CardProfile
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
