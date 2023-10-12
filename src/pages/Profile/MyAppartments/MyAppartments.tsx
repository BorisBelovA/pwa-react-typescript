import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Skeleton, Typography, useTheme } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from 'src/utils/StoreProvider'
import NoImage from '../../../assets/no-image.jpeg'
import commonStyles from '../Profile.module.scss'
import BackButton from 'src/components/Buttons/BackButton/BackButton'
import { mapCurrencyToSign } from 'src/utils/currency'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { apartmentService } from 'src/api/api-services/appartment'
import { mapApartmentToDto } from 'mapping-services'
import { type Apartment } from 'models'
import { useMainContext } from 'src/layouts/Main/MainLayout'

export const MyApartments = observer((): JSX.Element => {
  const { apartmentStore } = useStore()
  const { setMessage, setBackdropMessage, setBackdropVisible } = useMainContext()
  const theme = useTheme()

  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const haveApartment = apartmentStore.haveApartment
  const createApartment = (): void => {
    navigate('new/basic?purpose=rent')
  }

  const editApartment = (apartmentId: number): void => {
    navigate(`edit/basic?id=${apartmentId}`)
  }

  const apartments = useMemo(() => {
    return apartmentStore.apartments
  }, [apartmentStore.apartments])

  const getApartment = async (): Promise<void> => {
    await apartmentStore.getApartment()
    setIsLoading(false)
  }

  const removeAd = async (apartment: Apartment): Promise<void> => {
    setBackdropVisible(true)
    setBackdropMessage('Removing your add from publication')
    try {
      await apartmentService.removeAd(mapApartmentToDto(apartment))
      setMessage({
        text: 'Your ad was removed from publication',
        life: 5000,
        visible: true,
        severity: 'success'
      })
      setBackdropVisible(false)
      await getApartment()
    } catch (e) {
      setMessage({
        text: e instanceof Error
          ? e.message
          : 'Something went wrong',
        life: 5000,
        visible: true,
        severity: 'error'
      })
      setBackdropVisible(false)
    }
  }
  useEffect(() => {
    void getApartment()
  }, [])

  return <>
    <Box className={`${commonStyles.profile__header} ${commonStyles.mb1}`}>
      <BackButton />
      <Typography variant='h1'>My appartments</Typography>
    </Box>
    {isLoading &&
      <Skeleton variant="rounded" width='100%' height={240} animation="wave" />
    }
    {!isLoading &&
      <Button variant='contained'
        sx={{ marginBottom: '1rem' }}
        onClick={() => { createApartment() }}
      >Add apartment
      </Button>
    }
    <Box sx={{ overflowY: 'auto' }}>
      {!isLoading && haveApartment &&
        apartments.map(ap =>
          <Card key={ap.id} variant="outlined"
            sx={{ marginBottom: '1rem' }}>
            <CardActionArea onClick={() => { editApartment(ap.id) }}>
              <CardMedia
                component="img"
                height="200"
                src={`${ap.photos[0] ?? NoImage}`}
                alt="apartment-image"
              />
            </CardActionArea>
            <CardContent sx={{ display: 'flex' }}>
              <Box onClick={() => { editApartment(ap.id) }} sx={{ flexGrow: '1' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {ap.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {ap.totalPrice} {mapCurrencyToSign(ap.currency)}
                </Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexBasis: '200px'
              }}>
                <Link to={`/profile/my-apartments/preview/${ap.id}`}>
                  <Typography color={theme.palette.primary.main} sx={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                    <RemoveRedEyeIcon /> Preview
                  </Typography>
                </Link>
                {ap.purpose === 'Other' && <Chip label='No longer available' color='default' />}

                {ap.purpose === 'Rent' &&
                  <Box onClick={() => { void removeAd(ap) }}>
                    <Typography color={theme.palette.primary.main}
                      sx={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                      <RemoveCircleOutlineOutlinedIcon /> Remove AD
                    </Typography>
                  </Box>
                }
              </Box>
            </CardContent>
          </Card>
        )
      }
    </Box>
  </>
})
