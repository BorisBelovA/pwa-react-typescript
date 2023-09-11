import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import styles from './Search.module.scss'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { ReactComponent as SwitchIcon } from '../../assets/icons/switch.svg'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { type MatchNew } from 'models'
import { useEffect, useState } from 'react'
import { matchingService } from 'src/api/api-services/matching'
import { mapMatchToModel } from 'mapping-services'
import { useMainContext } from 'src/layouts/Main/MainLayout'
import { observer } from 'mobx-react-lite'
import { useStore } from 'src/utils/StoreProvider'
import SearchCardController from 'src/components/Cards/SearchCardController/SearchCardController'

interface SearchOffset {
  index: number
  page: number
}

const Search: React.FunctionComponent = observer(() => {
  const [action, setAction] = useState<'like' | 'dislike'>('dislike')
  const [index, setIndex] = useState<number>(0)
  const { setMessage } = useMainContext()
  const [matches, setMatches] = useState<MatchNew[]>([])
  const [page, setPage] = useState<number>(0)
  const { questionnaireStore } = useStore()
  const getMatches = async (offset: number): Promise<void> => {
    try {
      const response = await matchingService.getMatches(offset)
      const m = response.map(r => mapMatchToModel(r))
      // preloading all images to cache
      m.forEach(i => {
        const img = new Image()
        img.src = i.user.photo ?? ''
      })
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
      await getMatches(page)
    } else {
      await questionnaireStore.getQuestionnaire()
      await getMatches(page)
    }
  }

  useEffect(() => {
    // const storage = localStorage.getItem('search_offset')
    // if (storage) {
    //   const resStorage: SearchOffset = JSON.parse(storage)
    //   setIndex(resStorage.index)
    //   setPage(resStorage.page)
    // }
    void checkMatches()
  }, [])

  const handleIndexChange = (newIndex: number, matches: MatchNew[]): void => {
    if (newIndex < matches.length - 3) {
      setIndex(newIndex + 1)
      const toStorage: SearchOffset = { index: (newIndex + 1) % 10, page }
      localStorage.setItem('search_offset', JSON.stringify(toStorage))
      return
    }
    if (newIndex === matches.length - 1) {
      setIndex(0)
      const toStorage: SearchOffset = { index: 0, page }
      localStorage.setItem('search_offset', JSON.stringify(toStorage))
      return
    }
    const newPage = page + 1
    setPage(newPage)
    void getMatches(newPage)
    setIndex(newIndex + 1)
    const toStorage: SearchOffset = { index: (newIndex + 1) % 10, page: newPage }
    localStorage.setItem('search_offset', JSON.stringify(toStorage))
  }

  const likeUser = async (match: MatchNew): Promise<void> => {
    try {
      setAction('like')
      // if last one in matches handle index if not, just filter matches
      if (matches.length - 1 === index) {
        handleIndexChange(index, matches)
      }
      setMatches(matches.filter(m => m.form.id !== matches[index].form.id))
      await matchingService.likeUser(match.form.id)
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
          <Typography variant='h1'>{questionnaireStore.questionnaire?.location.country?.name},&nbsp;
          {questionnaireStore.questionnaire?.location.city?.name}</Typography>
          <IconButton><SwitchIcon /></IconButton>
        </Box>
        <IconButton color='primary'><FilterAltOutlinedIcon /></IconButton>
      </Box>
      <Box className={styles.search__content}>
        {matches.length > 0 && matches[index] &&
          <SearchCardController matchNew={matches[index]} action={action} />
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
            onClick={() => {
              setAction('dislike')
              handleIndexChange(index, matches)
            }}
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
              void likeUser(matches[index])
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
