import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import styles from './Search.module.scss'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { ReactComponent as SwitchIcon } from '../../assets/icons/switch.svg'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ProfileCard from 'src/components/ProfileCard/ProfileCard'
import people from '../../assets/temp/people/mockPeople.json'
import { Gender, QuestionnaireBasicType, User } from 'models'

interface People {
  info: QuestionnaireBasicType,
  person: User
}

const Search: React.FunctionComponent = () => {
  const pers: People[] = people.map((p) => ( { 
    ...p, 
    info: { 
      ...p.info, 
      who: p.info.who as "Alone" | "Friends" | "Couple" | "Family" | undefined }, 
    person: {
      ...p.person, 
      birthday: new Date(p.person.birthday),
      gender: p.person.gender as Gender
    } }))
  const theme = useTheme()
  return (
    <Box className={styles.search}>
      <Box className={styles.search__header}>
        <Box className={styles.search__headerContent}>
          <Typography variant='h1'>Israel, Haifa</Typography>
          <IconButton><SwitchIcon /></IconButton>
        </Box>
        <IconButton color='primary'><FilterAltOutlinedIcon /></IconButton>
      </Box>
      <Box className={styles.search__content}>
        <ProfileCard info={pers[0].info} person={pers[0].person}/>
      </Box>
      <Box className={styles.search__matchButtons}>
        <Button variant='contained' sx={{
          backgroundColor: theme.palette.background.paper,
          '&:hover': { backgroundColor: theme.palette.background.paper, boxShadow: theme.shadows[2] }
        }}>
          <CloseRoundedIcon color='primary' fontSize='large' />
        </Button>
        <Button variant='contained' color='primary' sx={{ '&:hover': { boxShadow: theme.shadows[2] } }}>
          <FavoriteIcon sx={{
            color: theme.palette.background.paper,
            fontSize: '2rem'
          }} />
        </Button>
      </Box>
    </Box>
  )
}

export default Search
