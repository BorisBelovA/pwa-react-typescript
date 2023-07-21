import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import styles from './Search.module.scss'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { ReactComponent as SwitchIcon } from '../../assets/icons/switch.svg'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ProfileCard from 'src/components/ProfileCard/ProfileCard'
import people from '../../assets/temp/people/mockPeople.json'
import { AuthUser, MatchNew, type Gender, type QuestionnaireBasicType, type User } from 'models'
import { useEffect, useState } from 'react'
import { matchingService } from 'src/api/api-services/matching'
import { mapMatchToModel, mapQuestionnaireToModel } from 'mapping-services'
import { useMainContext } from 'src/layouts/Main/MainLayout'

interface People {
  info: QuestionnaireBasicType
  person: AuthUser
}

const Search: React.FunctionComponent = () => {
  const [index, setIndex] = useState<number>(0)
  const { setMessage } = useMainContext()
  // const pers: People[] = people.map((p) => ({
  //   ...p,
  //   info: {
  //     ...p.info,
  //     who: p.info.who as 'Alone' | 'Friends' | 'Couple' | 'Family' | undefined
  //   },
  //   person: {
  //     ...p.person,
  //     birthday: new Date(p.person.birthday),
  //     gender: p.person.gender as Gender
  //   }
  // }))
  const [matches, setMatches] = useState<MatchNew[]>([])

  const getMatches = async (): Promise<void> => {
    const response = await matchingService.getMatches(0)
    setMatches(response.map(r => mapMatchToModel(r)))
  }

  useEffect(() => {
    try {
      getMatches()
    } catch (e) {
      setMessage({
        text: (e instanceof Error && e.message) ? e.message : 'Something went wrong',
        severity: 'error',
        life: 5000,
        visible: true
      })
    }
  }, [])

  const handleIndexChange = (newIndex: number, matches: MatchNew[]): void => {
    setIndex(newIndex < matches.length - 1 ? index + 1 : 0)
  }

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
        { matches[index] &&
          <ProfileCard info={matches[index]} person={matches[index].user} />
        }
      </Box>
      <Box className={styles.search__matchButtons}>
        <Button
          variant='contained'
          onClick={() => { handleIndexChange(index, matches) }}
          sx={{
            backgroundColor: theme.palette.background.paper,
            '&:hover': { backgroundColor: theme.palette.background.paper, boxShadow: theme.shadows[2] }
          }}>
          <CloseRoundedIcon color='primary' fontSize='large' />
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => { handleIndexChange(index, matches) }}
          sx={{ '&:hover': { boxShadow: theme.shadows[2] } }}>
          <FavoriteIcon sx={{
            color: theme.palette.background.paper,
            fontSize: '2rem'
          }} />
        </Button>
      </Box>
    </Box>
  )
  // return <Box>
  //   {/* <Typography>
  //     Soon we will add matches here!
  //   </Typography> */}
  // </Box>
}

export default Search
