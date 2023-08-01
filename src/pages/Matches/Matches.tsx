import { useNavigate } from 'react-router-dom'
import utilityStyles from '../../styles/utility.module.scss'
import styles from './Matches.module.scss'
import { type Chat } from 'models'
import { useEffect, useState } from 'react'
import { chatService } from 'api-services'
import { mapChatToModel } from 'src/api/mapping-services/chat'
import { Avatar, Box, Button, Card, CardContent, Skeleton, Typography } from '@mui/material'
import { useMainContext } from 'src/layouts/Main/MainLayout'

const CardSkeleton = ():JSX.Element => {
  return <Card sx={{ width: '100%', marginBottom: '24px' }} variant="outlined">
  <CardContent className={styles.match_card}>
    <Skeleton variant='circular' animation="wave" width={50} height={40} />
    <Box className={styles.match_details}>
      <Box className={styles.match_name}>
        <Skeleton animation="wave" width={'50%'} />
        <Skeleton animation="wave" width={'20%'}/>
      </Box>
      <Skeleton animation="wave" width={'100%'}/>
    </Box>
  </CardContent>
</Card>
}

const Matches = (): JSX.Element => {
  const navigate = useNavigate()
  const [chats, setChats] = useState<Chat[]>([])
  const [chatsLoading, setChatsLoading] = useState(true)
  const { setMessage } = useMainContext()
  const getAllChats = async (): Promise<void> => {
    try {
      const cts = (await chatService.getAllChats()).map(c => mapChatToModel(c))
      setChats(cts)
      setChatsLoading(false)
    } catch (error) {
      setMessage({
        text: error instanceof Error
          ? error.message
          : 'Something went wrong',
        severity: 'error',
        life: 5000,
        visible: true
      })
      setChatsLoading(false)
    }
  }

  const goToChat = (roomId: number, email: string): void => {
    navigate(`/chat?id=${roomId}&email=${email}`)
  }

  const searchSomeone = (): void => {
    navigate('/search')
  }

  useEffect(() => { getAllChats() }, [])
  return <>
    <Typography variant='h1'>Your matches</Typography>
    <Box className={styles.matches_container}>
      {chatsLoading && <>
        <CardSkeleton></CardSkeleton>
        <CardSkeleton></CardSkeleton>
        <CardSkeleton></CardSkeleton>
        <CardSkeleton></CardSkeleton>
      </>}
      {!chatsLoading && chats.map((c, index) =>
        <Card key={c.roomId} sx={{ width: '100%', marginBottom: '24px' }} variant="outlined"
          onClick={() => { goToChat(c.roomId, c.recipient.email) }}
        >
          <CardContent className={styles.match_card}>
            <Avatar alt="Remy Sharp" src={c.recipient.avatar ?? ''} />
            <Box className={styles.match_details}>
              <Box className={styles.match_name}>
                <Typography>{c.recipient.firstName}, {c.recipient.lastName}</Typography>
                <Typography>10:13 AM</Typography>
              </Box>
              <Typography noWrap={true}>Тут твое последнее сообщени aw daw  aw aе</Typography>
            </Box>
          </CardContent>
        </Card>
      )}
      {!chatsLoading && chats.length === 0 &&
        <Box className={styles.no_match}>
          <Typography>You have no matches yet! Try to search someone</Typography>
          <Button variant="outlined" onClick={searchSomeone}>Go to search</Button>
        </Box>
      }
    </Box>
  </>
}

export default Matches
