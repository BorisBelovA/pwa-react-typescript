import { type MatchNew } from 'models'
import CardProfile from '../CardProfile/CardProfile'
import { useEffect, useState } from 'react'
import styles from './SearchCardController.module.scss'
import { Box } from '@mui/material'
import CardDualPA from '../CardDualPA/CardDualPA'

interface Props {
  matchNew: MatchNew
}
const SearchCardController = ({ matchNew }: Props): JSX.Element => {
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
          ? <Box key={match.user.id} className={`${styles.card__container} ${index === 1 && styles.card__container_right}`}>
            <CardDualPA match={match} />
          </Box>
          : <Box
            key={match.user.id}
            className={`${styles.card__container} ${index === 1 && styles.card__container_right}`}>
            <CardProfile info={match.form} person={match.user} padding='3rem' />
          </Box>
      ))}

    </Box>
  )
}
export default SearchCardController
