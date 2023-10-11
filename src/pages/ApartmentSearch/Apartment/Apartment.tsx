import { Box, Skeleton, Typography } from '@mui/material'
import { mapApartmentToModel } from 'mapping-services'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apartmentService } from 'src/api/api-services/appartment'
import BackButton from 'src/components/Buttons/BackButton/BackButton'
import CardFullApartment from 'src/components/Cards/CardFullApartment/CardFullApartment'
import { useMainContext } from 'src/layouts/Main/MainLayout'
import { type Apartment as ApartmentModel } from 'src/models/apartment'
import commonStyles from 'src/pages/Profile/Profile.module.scss'

const Apartment = (): JSX.Element => {
  const [apartment, setApartment] = useState<ApartmentModel>()
  const { id } = useParams()
  const {
    setMessage
  } = useMainContext()

  const fetchApartment = async (): Promise<void> => {
    try {
      if (id) {
        const result = await apartmentService.getApartmentById(id)
        setApartment(mapApartmentToModel(result))
      }
    } catch (error) {
      console.log(error)
      setMessage({
        visible: true,
        text: `Can't get apartment ${id}`,
        severity: 'error'
      })
    }
  }

  useEffect(() => {
    if (!apartment && id) {
      void fetchApartment()
    }
  }, [])

  return (
    <>
      <Box className={commonStyles.profile__header}>
        <BackButton />
        <Typography variant='h1'>{apartment?.name ?? 'Appartment preview'}</Typography>
      </Box>
      {id
        ? apartment
          ? <CardFullApartment apartment={apartment} />
          : <Skeleton variant="rounded" width={'100%'} height={'100%'} sx={{ marginTop: '1rem', borderRadius: '1rem' }} />
        : <Typography>Sorry there is no apartment</Typography>
      }
    </>
  )
}
export default Apartment
