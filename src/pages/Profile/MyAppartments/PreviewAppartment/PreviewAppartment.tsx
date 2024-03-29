import { Box, Skeleton, Typography } from '@mui/material'
import { mapApartmentToModel } from 'mapping-services'
import { type Apartment } from 'models'
import { useEffect, useState } from 'react'
import commonStyles from '../../Profile.module.scss'
import { useParams } from 'react-router-dom'
import { apartmentService } from 'api/api-services/appartment'
import BackButton from 'components/Buttons/BackButton/BackButton'
import CardApartment from 'components/Cards/CardApartment/CardApartment'
import { useMainContext } from 'layouts/Main/MainLayout'
import { Trans, t } from '@lingui/macro'

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
        text: t`Can't get apartment ${id}`,
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
        <Typography variant='h1'>{apartment?.name ?? t({ message: 'Apartment preview' })}</Typography>
      </Box>
      {id
        ? apartment
          ? <CardApartment apartment={apartment} />
          : <Skeleton variant="rounded" width={'100%'} height={'100%'} sx={{ marginTop: '1rem', borderRadius: '1rem' }} />
        : <Typography>
          <Trans>Sorry there is no apartment</Trans>
        </Typography>
      }
    </>
  )
}
export default PreviewAppartment
