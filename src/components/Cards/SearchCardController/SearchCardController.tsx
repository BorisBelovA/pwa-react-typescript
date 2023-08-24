import { type MatchNew } from 'models'
import CardProfile from '../CardProfile/CardProfile'
import { useEffect, useState } from 'react'
import styles from './SearchCardController.module.scss'
import { Box } from '@mui/material'
import CardDualPA from '../CardDualPA/CardDualPA'

interface Props {
  matchNew: MatchNew
  action: 'like' | 'dislike'
}
const SearchCardController = ({ matchNew, action }: Props): JSX.Element => {
  const [matches, setMatches] = useState<MatchNew[]>([])

  const switchCards = (): void => {
    setTimeout(() => { setMatches([matches[0]]) }, 300)
  }

  useEffect(() => {
    matches.length === 0
      ? setMatches([matchNew])
      : matches[0].user.id !== matchNew.user.id &&
      setMatches([matchNew, ...matches])
  }, [matchNew])

  useEffect(() => {
    matches.length > 1 && switchCards()
  }, [matches])

  return (
    <Box className={styles.card}>
      {matches.map((match, index) => (
        match.form.apartment?.id
          ? <Box key={match.user.id} className={`${styles.card__container} 
          ${index === 1 && (action === 'like' ? styles.card__container_right : styles.card__container_left)}`}>
            <CardDualPA match={match} padding='3rem' />
          </Box>
          : <Box
            key={match.user.id}
            className={`${styles.card__container} 
            ${index === 1 && (action === 'like' ? styles.card__container_right : styles.card__container_left)}`}>
            <CardProfile info={match.form} person={match.user} padding='3rem' />
          </Box>
      ))}

    </Box>
  )
}
export default SearchCardController
