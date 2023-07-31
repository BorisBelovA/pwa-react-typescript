import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import styles from './Search.module.scss'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { ReactComponent as SwitchIcon } from '../../assets/icons/switch.svg'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ProfileCard from 'src/components/ProfileCard/ProfileCard'
import { type MatchNew } from 'models'
import { useEffect, useState } from 'react'
import { matchingService } from 'src/api/api-services/matching'
import { mapMatchToModel } from 'mapping-services'
import { useMainContext } from 'src/layouts/Main/MainLayout'
import { observer } from 'mobx-react-lite'
import { useStore } from 'src/utils/StoreProvider'

const Search: React.FunctionComponent = observer(() => {
  const [index, setIndex] = useState<number>(0)
  const { setMessage } = useMainContext()
  const [matches, setMatches] = useState<MatchNew[]>([])
  const [page, setPage] = useState<number>(0)
  const { questionnaireStore } = useStore()
  const getMatches = async (): Promise<void> => {
    try {
      const response = await matchingService.getMatches(page)
      const m = response.map(r => mapMatchToModel(r))
      setMatches(matches.concat(m))
    } catch (e) {
      setMessage({
        text: (e instanceof Error && e.message) ? e.message : 'Something went wrong',
        severity: 'error',
        life: 5000,
        visible: true
      })
    }
  }

  const checkMatches = async (): Promise<void> => {
    if (questionnaireStore.haveQuestionnaire) {
      await getMatches()
    } else {
      await questionnaireStore.getQuestionnaire()
      await getMatches()
    }
  }

  useEffect(() => {
    checkMatches()
  }, [])

  const handleIndexChange = (newIndex: number, matches: MatchNew[]): void => {
    if (newIndex < matches.length - 1) {
      setIndex(index + 1)
    } else {
      setPage(page + 1)
      getMatches()
      setIndex(0)
    }
  }

  const likeUser = async (match: MatchNew): Promise<void> => {
    try {
      await matchingService.likeUser(match.form.id)
      setMatches(matches.filter(m => m.form.id !== match.form.id))
    } catch (e) {
      setMessage({
        text: e instanceof Error ? e.message : 'Something went wrong',
        visible: true,
        life: 5000,
        severity: 'error'
      })
    }
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
        {matches.length > 0 && matches[index] &&
          <ProfileCard info={matches[index].form} person={matches[index].user} />
        }
        {matches.length === 0 &&
          <Typography variant='h6'>No matches yet</Typography>
        }
      </Box>
      {
        matches.length > 0 &&
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
            onClick={() => {
              handleIndexChange(index, matches)
              likeUser(matches[index])
            }}
            sx={{ '&:hover': { boxShadow: theme.shadows[2] } }}>
            <FavoriteIcon sx={{
              color: theme.palette.background.paper,
              fontSize: '2rem'
            }} />
          </Button>
        </Box>
      }
    </Box>
  )
})

export default Search
