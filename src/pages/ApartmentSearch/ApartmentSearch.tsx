import { Box, Button, IconButton, Typography } from '@mui/material'
import { useEffect } from 'react'
import ApartmentThumbnail from 'src/components/Cards/ApartmentThumbnail/ApartmentThumbnail'
import styles from './ApartmentSearch.module.scss'
import { useStore } from 'src/utils/StoreProvider'
import { FilterAltOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

const ApartmentSearch: React.FunctionComponent = () => {
  const { apartmentFiltersStore, apartmentSearchStore } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (apartmentSearchStore.apartments.length < 1) {
      apartmentFiltersStore.setPage(0)
      void apartmentSearchStore.getApartments()
    }
  }, [])

  return (
    <Box className={styles.householdContainer}>
      <Box className={styles.household__header}>
        <Typography variant='h1'>Search for apartments</Typography>
        <IconButton
          color='primary'
          sx={{ paddingBlock: '0' }}
          onClick={() => { navigate('filters') }}>
          <FilterAltOutlined />
        </IconButton>
      </Box>
      {apartmentSearchStore.apartments.map((apartment) => <ApartmentThumbnail apartment={apartment} key={apartment.id} />)}
      {apartmentSearchStore.haveMore
        ? <Button variant='contained' onClick={() => { void apartmentSearchStore.getMoreApartments() }}>Load more</Button>
        : <Box className={styles.household__noMore}>
          <Typography variant='h2'>Sorry, can&apos;t find more apartments</Typography>
          <Button variant='contained' onClick={() => { navigate('filters') }}>Change filters</Button>
          <Button variant='outlined' onClick={() => { void apartmentSearchStore.getMoreApartments() }}>Try again</Button>
        </Box>
      }
    </Box>
  )
}

export default observer(ApartmentSearch)
