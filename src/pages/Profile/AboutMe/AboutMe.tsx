import { Box, Card, Typography, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import commonStyles from '../Profile.module.scss'
import styles from './AboutMe.module.scss'
import { LinearProgressWithLabel } from 'components/LinearProgressWithLabel/LinearProgressWithLabel'
import { ProfileRoutes, type QuestionnaireBasicType, QuestionnaireRoutes } from 'models'
import { observer } from 'mobx-react-lite'
import { useStore } from 'utils/StoreProvider'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { useMemo } from 'react'
import BackButton from 'src/components/Buttons/BackButton/BackButton'
import { Trans } from '@lingui/macro'

const getPersonalInfoProgress = (questionnaire: QuestionnaireBasicType): number => {
  const whoProgress = questionnaire.who === null
    ? 0
    : questionnaire.who === 'Alone'
      ? 10
      : 5
  const countPeople = questionnaire.who !== 'Alone'
    ? questionnaire.countAdults !== null && questionnaire.countAdults !== null
      ? 5
      : 0
    : 0
  const petsProgress = questionnaire.havePets
    ? questionnaire.pets && questionnaire.pets.length > 0
      ? 10
      : 0
    : 10
  const smokingProgress = questionnaire.smoker === undefined
    ? 0
    : questionnaire.smoker
      ? questionnaire.smokingWhat.length > 0
        ? 10
        : 0
      : 10
  const languagePregress = questionnaire.languages.length > 0 ? 10 : 0
  const sleepingHabitProgress = questionnaire.sleepingHabits !== null ? 10 : 0
  const alcoholProgress = questionnaire.alcohol ? 10 : 0
  const guestProgress = questionnaire.guests ? 10 : 0
  const locationProgress = (questionnaire.location.city ? 4 : 0) +
    (questionnaire.location.state ? 3 : 0) +
    (questionnaire.location.city ? 3 : 0)
  const apartmentProgress = questionnaire.apartment ? 10 : 0
  const aboutmeProgress = questionnaire.about.length > 0 ? 10 : 0
  return whoProgress + countPeople + petsProgress + smokingProgress + languagePregress + sleepingHabitProgress + alcoholProgress +
    guestProgress + locationProgress + apartmentProgress + aboutmeProgress
}

const AboutMe = observer((): JSX.Element => {
  const navigate = useNavigate()
  const theme = useTheme()
  const goToQuestionnaire = (): void => {
    navigate(`/profile/${ProfileRoutes.BASIC_QUEST}/${QuestionnaireRoutes.WHO}`)
  }
  const { userStore, questionnaireStore } = useStore()

  const basicInfoProgress = useMemo(() => {
    const bioProgress = userStore.firstName.length > 0 && userStore.lastName.length > 0 ? 1 : 0
    const phoneProgress = userStore.phone ? 1 : 0
    const photoProgress = userStore.photo ? 1 : 0
    return (bioProgress + phoneProgress + photoProgress) / 3 * 100
  }, [userStore])

  const questionnaireProgress = useMemo(() => {
    return questionnaireStore.questionnaire
      ? getPersonalInfoProgress(questionnaireStore.questionnaire)
      : 0
  }, [questionnaireStore.questionnaire])

  return (
    <Box className={commonStyles.profile__container}>
      <Box className={commonStyles.profile__header}>
        <BackButton />
        <Typography variant='h1'>
          <Trans>About me</Trans>
        </Typography>
      </Box>
      <Box className={styles.profile__content}>
        <Card
          variant="outlined"
          sx={{ padding: '1rem' }}
          onClick={() => { navigate(`/profile/${ProfileRoutes.ABOUT_ME}/${ProfileRoutes.BASIC_INFO}`) }}>
          <Typography variant='h6'>
            <Trans>Basic Information</Trans>
          </Typography>
          <Box sx={{ width: '100%', marginTop: '0.5rem' }}>
            <LinearProgressWithLabel value={basicInfoProgress} />
          </Box>
        </Card>

        <Card variant="outlined" sx={{ padding: '1rem' }} onClick={goToQuestionnaire}>
          <Box className={styles.card_header}>
            <Typography variant='h6'>
              <Trans>Personal Info</Trans>
            </Typography>
            {questionnaireProgress === 100 && <CheckCircleOutlineIcon sx={{ color: theme.palette.primary.main }}></CheckCircleOutlineIcon>}
          </Box>
          <Box sx={{ width: '100%', marginTop: '0.5rem' }}>
            <LinearProgressWithLabel value={questionnaireProgress} />
          </Box>
        </Card>
      </Box>
    </Box>
  )
})

export default AboutMe
