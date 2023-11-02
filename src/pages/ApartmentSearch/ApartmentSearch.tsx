import { Box, Button, IconButton, Typography } from '@mui/material'
import { useEffect } from 'react'
import ApartmentThumbnail from 'src/components/Cards/ApartmentThumbnail/ApartmentThumbnail'
import styles from './ApartmentSearch.module.scss'
import { useStore } from 'src/utils/StoreProvider'
import { FilterAltOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useMainContext } from 'src/layouts/Main/MainLayout'

const ApartmentSearch: React.FunctionComponent = (): JSX.Element => {
  const { apartmentFiltersStore, apartmentSearchStore } = useStore()
  const { setMessage } = useMainContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (apartmentSearchStore.apartments.length < 1) {
      apartmentFiltersStore.getFromLocalStorage()
      apartmentFiltersStore.setPage(0)
      apartmentSearchStore.getApartments()
        .catch((error) => {
          setMessage({
            text: error instanceof Error
              ? error.message
              : 'Something went wrong',
            severity: 'error',
            life: 5000,
            visible: true
          })
        })
    }
    const root = document.getElementById('root')
    const handleScroll = (): void => {
      apartmentSearchStore.setScroll(root?.scrollTop ?? 0)
    }
    root?.addEventListener('scroll', handleScroll)
    if (apartmentSearchStore.scroll > 0) {
      root?.scroll({ top: apartmentSearchStore.scroll })
    }
    return () => {
      root?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const getMore = async (): Promise<void> => {
    apartmentSearchStore.getMoreApartments()
      .catch((error) => {
        setMessage({
          text: error instanceof Error
            ? error.message
            : 'Something went wrong',
          severity: 'error',
          life: 5000,
          visible: true
        })
      })
  }

  return (
    <Box className={styles.householdContainer}>
      <Box className={styles.household__header}>
        <Typography variant='h1'>Search for apartments
        </Typography>
        <IconButton
          color='primary'
          sx={{ paddingBlock: '0' }}
          onClick={() => { navigate('filters') }}>
          <FilterAltOutlined />
        </IconButton>
      </Box>
      {apartmentSearchStore.apartments.map((apartment) => <ApartmentThumbnail apartment={apartment} key={apartment.id} />)}
      {apartmentSearchStore.haveMore
        ? <Button variant='contained' onClick={() => { void getMore() }}>Load more</Button>
        : <Box className={styles.household__noMore}>
          <Typography variant='h2'>Sorry, can&apos;t find more apartments</Typography>
          <Button variant='contained' onClick={() => { navigate('filters') }}>Change filters</Button>
          <Button variant='outlined' onClick={() => { void getMore() }}>Try again</Button>
        </Box>
      }
    </Box>
  )
}

export default observer(ApartmentSearch)
