import { Box, Button } from '@mui/material'
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

const Onboarding = (): JSX.Element => {
  const [activePage, setActivePage] = useState<number>(0)
  const navigate = useNavigate()
  const pages: OnboardingPage[] = [
    {
      title: 'Rent',
      avatarOne: AvatarOne,
      messageOne: 'Mom, I’m moving out',
      avatarTwo: AvatarTwo,
      messageTwo: 'And who’s paying???',
      descriptionOne: 'Wanna rent a flat? Sweat hard when you see the prices? Yeah…',
      descriptionTwo: 'Here you can get both — an affordable place to live and the best roommates to share it with.'
    },
    {
      title: 'Communicate',
      avatarOne: AvatarThree,
      messageOne: 'I really need a date :(',
      avatarTwo: AvatarFour,
      messageTwo: 'And I need a tenant… Good luck to us!',
      descriptionOne: 'With this app you can easily rent out your flat…Or find a match. You never know.',
      descriptionTwo: 'Make a list of candidates and choose your perfect tenants right here.'
    },
    {
      title: 'Help',
      avatarOne: AvatarFive,
      messageOne: 'Just need a safe place in this nightmare :(',
      avatarTwo: AvatarSix,
      messageTwo: 'I’ve got a spare room — it’s free and safe!',
      descriptionOne: 'Ready to share your flat with refugees? Or you are one yourself?',
      descriptionTwo: 'Hosts and refugees are 3 clicks away — use our FREE mode to help or find a safe place.'
    }
  ]

  const nextPage = (): void => {
    if (activePage < pages.length - 1) {
      setActivePage(activePage + 1)
    } else {
      navigate('/auth/login')
    }
  }
  return (
    <Box className={styles.onboarding__container}>
      <OnboardingContent page={pages[activePage]} />
      <Box className={styles.onboarding__pages}>
        {[...Array(3)].map((x, i) => <Box
          key={i}
          className={`${styles.onboarding__counter} ${i === activePage ? styles.onboarding__counter_active : ''}`}
        />)}
      </Box>
      <Box className={styles.onboarding__actions}>
        <Button
          variant='contained'
          disabled={activePage === 0}
          className={styles.onboarding__actions_button}
          onClick={() => { setActivePage(activePage - 1) }}>
          <ArrowBackIosNewRoundedIcon />
        </Button>
        <Button
          variant='contained'
          className={styles.onboarding__actions_button_next}
          onClick={() => { nextPage() }}>
          <ArrowBackIosNewRoundedIcon />
        </Button>
      </Box>
      <Button variant='outlined' fullWidth onClick={() => { navigate('/auth/login') }}>Skip</Button>
    </Box>
  )
}
export default Onboarding
