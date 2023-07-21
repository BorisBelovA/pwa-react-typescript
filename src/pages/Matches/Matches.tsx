import { useNavigate } from 'react-router-dom'
import utilityStyles from '../../styles/utility.module.scss'
import styles from './Matches.module.scss'
import { Chat, type Match } from 'models'
import { MatchCard } from 'src/components/MatchCard/MatchCard'
import { useEffect, useState } from 'react'
import { chatService } from 'api-services'
import { mapChatToModel } from 'src/api/mapping-services/chat'
import { Typography } from '@mui/material'

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
  const [chats, setChats] = useState<Chat[]>([])

  const getAllChats = async (): Promise<void> => {
    const cts = (await chatService.getAllChats()).map(c => mapChatToModel(c))
    setChats(cts)
  }
  useEffect(() => { getAllChats() }, [])
  return <>
    <h2 className={utilityStyles.headerTemp}>Your matches</h2>
    <div className={styles.matchesContainer}>
      {/* { matches.map((m, index) => <MatchCard key={index} match={m}></MatchCard>) } */}
      { chats.map((c, index) => <Typography key={index} onClick={() => navigate(`/chat?id=${c.roomId}`)}>
        {c.roomId}
      </Typography>) }
    </div>
  </>
}

export default Matches
