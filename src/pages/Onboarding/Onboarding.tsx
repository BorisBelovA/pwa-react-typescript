import { Box, Button, useTheme } from '@mui/material'
import styles from './Onboarding.module.scss'
import { useState } from 'react'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'
import OnboardingContent, { type OnboardingPage } from 'components/Onboarding/OnboardingContent/OnboardingContent'
import { useNavigate } from 'react-router-dom'
import AvatarOne from '../../assets/onboarding/avatar1.png'
import AvatarTwo from '../../assets/onboarding/avatar2.png'
import AvatarThree from '../../assets/onboarding/avatar3.png'
import AvatarFour from '../../assets/onboarding/avatar4.png'
import AvatarFive from '../../assets/onboarding/avatar5.png'
import AvatarSix from '../../assets/onboarding/avatar6.png'
import LanguagePicker from 'components/LanguagePicker/LanguagePicker'
import { t, msg } from '@lingui/macro'

const Onboarding = (): JSX.Element => {
  const [activePage, setActivePage] = useState<number>(0)
  const navigate = useNavigate()
  const theme = useTheme()
  const pages: OnboardingPage[] = [
    {
      title: msg`Co-living made\xa0easy`,
      avatarOne: AvatarOne,
      messageOne: msg`Mom, I'm moving out`,
      avatarTwo: AvatarTwo,
      messageTwo: msg`And who's paying???`,
      descriptionOne: msg`Wanna rent a flat? Sweat hard when you see the prices? Yeah…`,
      descriptionTwo: msg`Here you can get both — an affordable place to live and the best roommates to share it with.`
    },
    {
      title: msg`Get a\xa0roommate`,
      avatarOne: AvatarThree,
      messageOne: msg`I really need a date :(`,
      avatarTwo: AvatarFour,
      messageTwo: msg`And I need a tenant… Good luck to us!`,
      descriptionOne: msg`With this app you can easily rent out your flat…Or find a match. You never know.`,
      descriptionTwo: msg`Make a list of candidates and choose your perfect tenants right here.`
    },
    {
      title: msg`Help out & get\xa0help`,
      avatarOne: AvatarFive,
      messageOne: msg`Just need a safe place in this nightmare :(`,
      avatarTwo: AvatarSix,
      messageTwo: msg`I've got a spare room — it's free and safe!`,
      descriptionOne: msg`Ready to share your flat with refugees? Or you are one yourself?`,
      descriptionTwo: msg`Hosts and refugees are 3 clicks away — use our FREE mode to help or find a safe place.`
    }
  ]

  const nextPage = (): void => {
    if (activePage < pages.length - 1) {
      setActivePage(activePage + 1)
    } else {
      localStorage.setItem('is_onboarded', 'true')
      navigate('/auth/login')
    }
  }
  return (
    <Box className={styles.onboarding__container} dir='ltr'>
      <LanguagePicker />
      <OnboardingContent page={pages[activePage]} />
      <Box className={styles.onboarding__pages} dir='ltr'>
        {[...Array(3)].map((x, i) => <Box
          key={i}
          className={`${styles.onboarding__counter} ${i === activePage ? styles.onboarding__counter_active : ''}`}
        />)}
      </Box>
      <Box className={styles.onboarding__actions} dir='ltr'>
        <Button
          variant='contained'
          sx={{ backgroundColor: theme.palette.background.paper, color: theme.palette.primary.main }}
          disabled={activePage === 0}
          className={styles.onboarding__actions_button}
          onClick={() => { setActivePage(activePage - 1) }}>
          <ArrowBackIosNewRoundedIcon />
        </Button>
        <Button
          variant='contained'
          sx={{ backgroundColor: theme.palette.background.paper, color: theme.palette.primary.main }}
          className={styles.onboarding__actions_button_next}
          onClick={() => { nextPage() }}>
          <ArrowBackIosNewRoundedIcon />
        </Button>
      </Box>
      <Button variant='outlined' fullWidth
        onClick={() => {
          localStorage.setItem('is_onboarded', 'true')
          navigate('/auth/login')
        }}>
        {t`Skip`}
      </Button>
    </Box>
  )
}
export default Onboarding
