import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import styles from './Search.module.scss'
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

  const [currentMatches, setCurrentMatches] = useState<MatchNew[]>([])
  const [nextMatches, setNextMatches] = useState<MatchNew[]>([])

  // may be change to newMatches.length > 0, not sure about microqueue
  const [haveNewMatches, setHaveNewMatches] = useState<boolean>(false)

  // only show "go from start" button if there were matches before
  const [hadMatches, setHadMatches] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  // const [currentImages, setCurrentImages] = useState<HTMLImageElement[]>([])
  // const [nextImages, setNextImages] = useState<HTMLImageElement[]>([])

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [nextPage, setNextPage] = useState<number>(1)

  const { questionnaireStore } = useStore()

  const getMatches = async (offset: number): Promise<MatchNew[]> => {
    try {
      const response = await matchingService.getMatches(offset)
      const m = response.map(r => mapMatchToModel(r))
      return m
    } catch (e) {
      setMessage({
        text: (e instanceof Error && e.message) ? e.message : 'Something went wrong',
        severity: 'error',
        life: 5000,
        visible: true
      })
      return []
    }
  }

  const preloadImages = (matches: MatchNew[]): HTMLImageElement[] => {
    const images = matches.map(i => {
      const img = new Image()
      img.src = i.user.photo ?? ''
      return img
    })
    return images
  }

  const startMatching = async (page: number): Promise<void> => {
    const m = await getMatches(page)
    setIsLoading(true)
    if (m.length > 0) {
      setCurrentMatches(m)
      preloadImages(m)
      // setCurrentImages(preloadImages(m))
      if (index > m.length - 1 && m.length > 0) setIndex(m.length - 1)
      setNextPage(page + 1)
    }
    setIsLoading(false)
  }

  const getNextMatches = async (page: number): Promise<void> => {
    setIsLoading(true)
    const m = await getMatches(page)
    if (m.length > 0) {
      setNextMatches(m)
      preloadImages(m)
      setHaveNewMatches(true)
      setHadMatches(true)
      // setNextImages(preloadImages(m))
    }
    setIsLoading(false)
  }

  const matchesSwitch = async (): Promise<void> => {
    setCurrentMatches([])
    if (!isLoading && nextMatches.length > 0) {
      setCurrentMatches([...nextMatches])
      // setCurrentImages([...nextImages])
      setIndex(0)
      setCurrentPage(nextPage)
      handleLocalStorage(0, nextPage)
      setNextMatches([])
      setHaveNewMatches(false)
      setNextPage(nextPage + 1)
    }
  }

  const checkMatches = async (page: number): Promise<void> => {
    if (!questionnaireStore.haveQuestionnaire) {
      await questionnaireStore.getQuestionnaire()
    }
    await startMatching(page)
  }

  useEffect(() => {
    const storage = localStorage.getItem('search_offset')
    if (storage) {
      const resStorage: SearchOffset = JSON.parse(storage)
      setIndex(resStorage.index)
      setCurrentPage(resStorage.page)
      setNextPage(resStorage.page + 1)
      void checkMatches(resStorage.page)
    } else {
      void checkMatches(currentPage)
    }
  }, [])

  const handleLocalStorage = (newIndex: number, newPage: number): void => {
    const toStorage: SearchOffset = { index: newIndex, page: newPage }
    localStorage.setItem('search_offset', JSON.stringify(toStorage))
  }

  const handleIndexChange = (currentIndex: number, matches: MatchNew[]): void => {
    if (currentIndex > matches.length - 3 && !haveNewMatches) {
      if (!isLoading) {
        void getNextMatches(nextPage)
      }
    }
    if (currentIndex === matches.length - 1) {
      void matchesSwitch()
      return
    }
    if (currentIndex > matches.length - 1) {
      setIndex(matches.length - 1)
      handleLocalStorage(matches.length - 1, currentPage)
    }
    setIndex(currentIndex + 1)
    handleLocalStorage(currentIndex + 1, currentPage)
  }

  const startAgain = (): void => {
    void startMatching(0)
    setCurrentPage(0)
    setIndex(0)
    setNextPage(1)
    handleLocalStorage(0, 0)
  }

  const refresh = async (): Promise<void> => {
    await startMatching(nextPage)
    setIndex(0)
    setCurrentPage(nextPage)
    handleLocalStorage(0, nextPage)
  }

  const likeUser = async (match: MatchNew): Promise<void> => {
    try {
      setAction('like')
      // if last one in matches handle index if not, just filter matches
      if (currentMatches.length - 1 === index) {
        handleIndexChange(index, currentMatches)
      }
      setCurrentMatches(currentMatches.filter(m => m.form.id !== currentMatches[index].form.id))
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
        {/* <IconButton color='primary'><FilterAltOutlinedIcon /></IconButton> */}
      </Box>
      <Box className={styles.search__content}>
        {currentMatches.length > 0 && currentMatches[index] &&
          <SearchCardController matchNew={currentMatches[index]} action={action} />
        }
        {currentMatches.length === 0 && isLoading &&
          <>
            <Typography>Loading...</Typography>
          </>
        }
        {currentMatches.length === 0 && !isLoading &&
          <>
            <Typography variant='h6'>No matches yet</Typography>
            <Button
              variant='contained'
              fullWidth
              onClick={() => { void refresh() }}>
              Refresh
            </Button>
            {(hadMatches || currentPage > 0 || index > 0) &&
              <Button
                variant='contained'
                fullWidth
                onClick={() => { startAgain() }}
              >Start again</Button>
            }
          </>
        }
      </Box>
      {
        currentMatches.length > 0 &&
        <Box className={styles.search__matchButtons}>
          <Button
            variant='contained'
            onClick={() => {
              setAction('dislike')
              handleIndexChange(index, currentMatches)
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
              void likeUser(currentMatches[index])
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
