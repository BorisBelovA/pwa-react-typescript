import { Card, CardContent, Avatar, Box, Typography, Chip, Skeleton } from '@mui/material'
import { type Chat } from 'models'
import styles from './ChatCard.module.scss'

interface ChatCardProps {
  chat: Chat
  onClick: () => void
}

export const ChatCard = ({ chat, onClick }: ChatCardProps): JSX.Element => {
  return <Card key={chat.roomId} sx={{ width: '100%', marginBottom: '24px' }} variant="outlined"
    onClick={onClick}>
    <CardContent className={styles.match_card}>
      <Avatar alt="Remy Sharp" src={chat.recipient.avatar ?? ''} />
      <Box className={styles.match_details}>
        <Box className={styles.match_name}>
          <Typography>{chat.recipient.firstName}, {chat.recipient.lastName}</Typography>
          <Typography>10:13 AM</Typography>
        </Box>
        <Box className={styles.match_name}>
          <Typography noWrap={true}>Тут твое последнее сообщени aw daw  aw aе</Typography>
          {chat.unreadMessages > 0 && <Chip label={chat.unreadMessages} variant="filled" color='info' />}
        </Box>
      </Box>
    </CardContent>
  </Card>
}

export const CardSkeleton = (): JSX.Element => {
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