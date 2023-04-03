import { Avatar, Box, IconButton, Typography } from '@mui/material'
import { type User } from 'models'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { ReactComponent as ProgressIcon } from '../../assets/icons/progress.svg'
import { calculateAge } from 'src/utils/date-time'
import styles from './PersonCard.module.scss'

interface Props {
  person: string | User
  waiting?: boolean
  main?: boolean
  handleDelete: (index: number) => void
  index: number
}
const PersonCard = ({ person, waiting, main, handleDelete, index }: Props): JSX.Element => {
  return (
    <Box className={styles.personCard}>
      <Avatar className={styles.personCard__avatar} />
      <Typography className={styles.personCard__text}>
        {typeof person === 'string' ? person : `${person.firstName}, ${calculateAge(person.birthday)}`}
      </Typography>
      {typeof person === 'string' && <ProgressIcon />}
      {(main === false || main === undefined) && <IconButton onClick={() => { handleDelete(index) }}><HighlightOffIcon /></IconButton>}
    </Box>
  )
}
export default PersonCard
