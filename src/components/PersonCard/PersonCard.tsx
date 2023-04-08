import { Avatar, Box, IconButton, Typography } from '@mui/material'
import { type ShortUser } from 'models'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { ReactComponent as ProgressIcon } from '../../assets/icons/progress.svg'
import styles from './PersonCard.module.scss'

interface Props {
  person: string | ShortUser
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
        {typeof person === 'string' ? person : `${person.name}, ${person.age}`}
      </Typography>
      <Box>
        {typeof person === 'string' && <IconButton><ProgressIcon /></IconButton>}
        {(main === false || main === undefined) &&
          <IconButton onClick={() => { handleDelete(index) }}><HighlightOffIcon /></IconButton>
        }
      </Box>
    </Box>
  )
}
export default PersonCard
