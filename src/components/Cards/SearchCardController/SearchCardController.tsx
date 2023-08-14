import { type MatchNew } from 'models'
import ReactCardFlip from 'react-card-flip'
import CardProfile from '../CardProfile/CardProfile'
import CardApartment from '../CardApartment/CardApartment'
import { useEffect, useState } from 'react'
import styles from './SearchCardController.module.scss'
import { Box } from '@mui/material'

interface Props {
  matchNew: MatchNew
}
const SearchCardController = ({ matchNew }: Props): JSX.Element => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const [matches, setMatches] = useState<MatchNew[]>([])

  const handleFlip = (): void => {
    setIsFlipped(!isFlipped)
  }

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
          ? <ReactCardFlip
            key={match.user.id}
            isFlipped={isFlipped}
            containerClassName={`${styles.card__container} ${index === 1 && styles.card__container_right}`}>
            <CardProfile info={match.form} person={match.user} padding='3rem' flipCard={handleFlip} />
            <CardApartment apartment={match.form.apartment} user={match.user} padding='3rem' flipCard={handleFlip} />
          </ReactCardFlip>
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
