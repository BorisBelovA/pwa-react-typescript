import { Box, Typography } from '@mui/material'
import styles from './OnboardingContent.module.scss'
import OnboardingChat from '../OnboardingChat/OnboardingChat'
import { type MessageDescriptor } from '@lingui/core'
import { useLingui } from '@lingui/react'

interface Props {
  page: OnboardingPage
}

export interface OnboardingPage {
  title: MessageDescriptor
  avatarOne: string
  messageOne: MessageDescriptor
  avatarTwo: string
  messageTwo: MessageDescriptor
  descriptionOne: MessageDescriptor
  descriptionTwo: MessageDescriptor
}

const OnboardingContent = ({ page }: Props): JSX.Element => {
  const { i18n } = useLingui()
  return (
    <Box className={styles.onboarding__content}>
      <Typography variant='h1'>{i18n._(page.title)}</Typography>
      <OnboardingChat page={page} />
      <Box className={styles.onboarding__info}>
        <Typography>{i18n._(page.descriptionOne)}</Typography>
        <Typography>{i18n._(page.descriptionTwo)}</Typography>
      </Box>
    </Box>
  )
}

export default OnboardingContent
