import { Box, Button, IconButton, Typography } from '@mui/material'
import { mapApartmentToModel } from 'mapping-services'
import { type ApartmentFilters, type Apartment } from 'models'
import { useEffect, useState } from 'react'
import { apartmentService } from 'src/api/api-services/appartment'
import ApartmentThumbnail from 'src/components/Cards/ApartmentThumbnail/ApartmentThumbnail'
import styles from './ApartmentSearch.module.scss'
import { useMainContext } from 'src/layouts/Main/MainLayout'
import { useStore } from 'src/utils/StoreProvider'
import { FilterAltOutlined } from '@mui/icons-material'

const ApartmentSearch: React.FunctionComponent = () => {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const { setMessage } = useMainContext()
  const { apartmentFiltersStore } = useStore()
  const [filters, setFilters] = useState<ApartmentFilters>({
    country: {
      id: 106
    },

    sort: {
      field: 'price',
      direction: 'DESC'
    },
    priceFrom: 0,
    priceTo: 20000,
    currency: 'NIS',

    pagination: {
      page: 0,
      size: 5
    }
  })

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
        setFilters({
          ...filters,
          pagination: {
            ...filters.pagination,
            page: filters.pagination.page + 1
          }
        })
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
  }, [])

  return (
    <Box className={styles.householdContainer}>
      <Box className={styles.household__header}>
        <Typography variant='h1'>Search for apartments</Typography>
        <IconButton
          color='primary'
          sx={{ paddingBlock: '0' }}
          onClick={() => {}}>
          <FilterAltOutlined />
        </IconButton>
      </Box>
      {apartments.map((apartment) => <ApartmentThumbnail apartment={apartment} key={apartment.id} />)}
      <Button variant='contained' onClick={() => { void getMoreApartments() }}>Load more</Button>
    </Box>
  )
}

export default ApartmentSearch
