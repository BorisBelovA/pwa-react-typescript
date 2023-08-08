import styles from './Summary.module.scss'
import { Box, IconButton, ImageList, ImageListItem, Typography, useTheme } from '@mui/material'
import { apartmentQuestionnaireContext } from '../AppartmentQuestionnaire'
import { useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { ApartmentsQuestionnaireRoutes, type Currency } from 'models'
import { useNavigate } from 'react-router-dom'

export const Summary = (): JSX.Element => {
  const { apartment, setActive, setPercent } = apartmentQuestionnaireContext()
  const theme = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    setActive(ApartmentsQuestionnaireRoutes.SUMMARY)
    setPercent(100, 100, ApartmentsQuestionnaireRoutes.SUMMARY)
  }, [])

  const mapCurrencyToSign = (currency: Currency): string => {
    switch (currency) {
      case 'EUR': return '€'
      case 'USD': return '$'
      case 'ILS': return '₪'
      default: throw new Error('Unknown currency type!')
    }
  }

  const goToStep = (step: ApartmentsQuestionnaireRoutes): void => {
    navigate(`../${step}`)
  }

  const address = (): string => {
    const { country, city, district } = apartment.location
    return country.name +
      (district ? ', ' + district.name : '') +
      (city ? ', ' + city.name : '')
  }

  return <Box className={styles.summary_container}>
    <Box>
      <Box className={styles.header_row}>
        <Typography variant="h6">{apartment.name}</Typography>
        <IconButton sx={{ color: theme.palette.primary.main }}
          aria-label="edit"
          onClick={() => { goToStep(ApartmentsQuestionnaireRoutes.BASIC) }}>
          <EditIcon fontSize='small' />
        </IconButton>
      </Box>
      <Typography variant="body1" color={theme.palette.text.secondary}>
        {apartment.totalPrice} {mapCurrencyToSign(apartment.currency)} per room
      </Typography>
    </Box>

    <Box className={styles.header_row}>
      <Box>
        <Typography variant="h6">{address()}</Typography>
        <Typography variant="subtitle1">{apartment.location.address ?? ''}</Typography>
      </Box>
      <IconButton sx={{ color: theme.palette.primary.main }}
        aria-label="edit"
        onClick={() => { goToStep(ApartmentsQuestionnaireRoutes.LOCATION) }}>
        <EditIcon fontSize='small' />
      </IconButton>
    </Box>

    <Box>
      <Box className={styles.header_row}>
        <Typography variant="h6">Photos</Typography>
        <IconButton sx={{ color: theme.palette.primary.main }}
          aria-label="edit"
          onClick={() => { goToStep(ApartmentsQuestionnaireRoutes.PHOTOS) }}>
          <EditIcon fontSize='small' />
        </IconButton>
      </Box>
      <ImageList cols={3} gap={8}>
        {apartment.photos.map((photo, index) => {
          return <ImageListItem key={index} sx={{
            borderRadius: '16px',
            border: '1px solid gray',
            overflow: 'hidden'
          }}>
            <img src={photo} height='100px' loading="lazy"
            />
          </ImageListItem>
        })}
      </ImageList>
    </Box>

    {
      apartment.description.length > 0 &&
      <Box>
        <Box className={styles.header_row}>
          <Typography variant="h6">Description</Typography>
          <IconButton sx={{ color: theme.palette.primary.main }}
            aria-label="edit"
            onClick={() => { goToStep(ApartmentsQuestionnaireRoutes.ABOUT) }}>
            <EditIcon fontSize='small' />
          </IconButton>
        </Box>
        <Typography>{apartment.description}</Typography>
      </Box>
    }
  </Box>
}
