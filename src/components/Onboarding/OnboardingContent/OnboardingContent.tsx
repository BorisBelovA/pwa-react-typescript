import { Box, Typography } from '@mui/material'
import styles from './OnboardingContent.module.scss'
import OnboardingChat from '../OnboardingChat/OnboardingChat'

interface Props {
  page: OnboardingPage
}

export interface OnboardingPage {
  title: string
  avatarOne: string
  messageOne: string
  avatarTwo: string
  messageTwo: string
  descriptionOne: string
  descriptionTwo: string
}

const OnboardingContent = ({ page }: Props): JSX.Element => {
  return (
    <Box className={styles.onboarding__content}>
      <Typography variant='h1'>{page.title}</Typography>
      <OnboardingChat page={page} />
      <Box className={styles.onboarding__info}>
        <Typography>{page.descriptionOne}</Typography>
        <Typography>{page.descriptionTwo}</Typography>
      </Box>
    </Box>
  )
}

export default OnboardingContent
