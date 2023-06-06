import { useNavigate } from 'react-router-dom'
import utilityStyles from '../../styles/utility.module.scss'
import styles from './Matches.module.scss'
import type { Match } from 'models'
import { MatchCard } from 'src/components/MatchCard/MatchCard'

const matches: Match[] = [
  {
    name: 'Bart',
    age: 23,
    location: {
      city: 'Tel-Aviv',
      country: 'Israel'
    },
    contacts: {
      email: 'bart23@israil.mail.com',
      telegram: 'bart@telegram'
    }
  },
  {
    name: 'Alyx',
    age: 31,
    location: {
      city: 'Halifa',
      country: 'Israel'
    },
    contacts: {
      email: 'alyx@israil.mail.com',
      telephone: '+7(123)92-23-12'
    }
  },
  {
    name: 'Gordon',
    age: 42,
    location: {
      city: 'Nevada',
      country: 'USA'
    },
    contacts: {
      email: 'gordon@usa.mail.com'
    }
  }
]

const Matches: React.FunctionComponent = () => {
  const navigate = useNavigate()
  return <>
    <h2 className={utilityStyles.headerTemp}>Your matches</h2>
    <div className={styles.matchesContainer} onClick={() => navigate('/chat')}>
      { matches.map((m, index) => <MatchCard key={index} match={m}></MatchCard>) }
    </div>
  </>
}

export default Matches
