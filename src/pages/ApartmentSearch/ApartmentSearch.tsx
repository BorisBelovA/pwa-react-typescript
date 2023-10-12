import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { mapApartmentToModel } from 'mapping-services'
import { type Apartment } from 'models'
import { useEffect, useState } from 'react'
import { apartmentService } from 'src/api/api-services/appartment'
import ApartmentThumbnail from 'src/components/Cards/ApartmentThumbnail/ApartmentThumbnail'
import styles from './ApartmentSearch.module.scss'
import { useMainContext } from 'src/layouts/Main/MainLayout'
import { useStore } from 'src/utils/StoreProvider'
import { FilterAltOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const ApartmentSearch: React.FunctionComponent = () => {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const { setMessage } = useMainContext()
  const { apartmentFiltersStore } = useStore()
  const navigate = useNavigate()
  const [haveMore, setHaveMore] = useState<boolean>(true)

  const getApartments = async (): Promise<void> => {
    try {
      const response = await apartmentService.searchApartments(apartmentFiltersStore.getFilters())
      setApartments(response.map((apt) => mapApartmentToModel(apt)))
    } catch (error) {
      setMessage({
        text: error instanceof Error
          ? error.message
          : 'Something went wrong',
        severity: 'error',
        life: 5000,
        visible: true
      })
    }
  }

  const getMoreApartments = async (): Promise<void> => {
    try {
      const response = await apartmentService.searchApartments({
        ...apartmentFiltersStore.getFilters(),
        pagination: {
          ...apartmentFiltersStore.getFilters().pagination,
          page: apartmentFiltersStore.pagination.page + 1
        }
      })
      if (response.length > 0) {
        setApartments([...apartments, ...response.map((apt) => mapApartmentToModel(apt))])
        setHaveMore(true)
        // apartmentFiltersStore.setPage(apartmentFiltersStore.pagination.page + 1)
      } else {
        setHaveMore(false)
      }
    } catch (error) {
      setMessage({
        text: error instanceof Error
          ? error.message
          : 'Something went wrong',
        severity: 'error',
        life: 5000,
        visible: true
      })
    }
  }

  useEffect(() => {
    void getApartments()
    // apartmentFiltersStore.setPage(0)
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
      {apartments.map((apartment) => <ApartmentThumbnail apartment={apartment} key={apartment.id} />)}
      {haveMore
        ? <Button variant='contained' onClick={() => { void getMoreApartments() }}>Load more</Button>
        : <Box className={styles.household__noMore}>
          <Typography variant='h2'>Sorry, can&apos;t find more apartments</Typography>
          <Button variant='contained' onClick={() => { navigate('filters') }}>Change filters</Button>
          <Button variant='outlined' onClick={() => { void getMoreApartments() }}>Try again</Button>
        </Box>
      }
    </Box>
  )
}

export default ApartmentSearch
