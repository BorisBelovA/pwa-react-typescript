import { Skeleton, Typography } from '@mui/material'
import { mapApartmentToModel } from 'mapping-services'
import { type Apartment } from 'models'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apartmentService } from 'src/api/api-services/appartment'
import CardApartment from 'src/components/Cards/CardApartment/CardApartment'
import { useMainContext } from 'src/layouts/Main/MainLayout'

const PreviewAppartment = (): JSX.Element => {
  const [apartment, setApartment] = useState<Apartment>()
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
      <Typography variant='h1'>{id ?? 'Appartment preview'}</Typography>
      {id
        ? apartment
          ? <CardApartment apartment={apartment} />
          : <Skeleton variant="rounded" width={'100%'} height={'100%'} sx={{ marginTop: '1rem', borderRadius: '1rem' }} />
        : <Typography>Sorry there is no apartment</Typography>
      }
    </>
  )
}
export default PreviewAppartment
