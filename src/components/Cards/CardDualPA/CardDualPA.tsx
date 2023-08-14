import { type MatchNew } from 'models'
import ReactCardFlip from 'react-card-flip'
import CardProfile from '../CardProfile/CardProfile'
import CardApartment from '../CardApartment/CardApartment'
import { useState } from 'react'
import styles from './CardDualPA.module.scss'

interface Props {
  match: MatchNew
}
const CardDualPA = ({ match }: Props): JSX.Element => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)

  const handleFlip = (): void => {
    setIsFlipped(!isFlipped)
  }
  return (
    <ReactCardFlip
      key={match.user.id}
      isFlipped={isFlipped}
      containerClassName={styles.card}>
      <CardProfile info={match.form} person={match.user} padding='3rem' flipCard={handleFlip} />
      <CardApartment apartment={match.form.apartment!} user={match.user} padding='3rem' flipCard={handleFlip} />
    </ReactCardFlip>
  )
}
export default CardDualPA
