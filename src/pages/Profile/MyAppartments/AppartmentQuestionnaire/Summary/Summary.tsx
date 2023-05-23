import styles from './Summary.module.scss'
import { Box, IconButton, ImageList, ImageListItem, Typography, useTheme } from '@mui/material'
import { appartmentQuestionnaireContext } from '../AppartmentQuestionnaire'
import { useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { AppartmentsRoutes, type Currency } from 'models'
import { useNavigate } from 'react-router-dom'

export const Summary = (): JSX.Element => {
  const { appartment, setActive, setPercent } = appartmentQuestionnaireContext()
  const theme = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    setActive(AppartmentsRoutes.SUMMARY)
    setPercent(100, 100, AppartmentsRoutes.SUMMARY)
  }, [])

  const mapCurrencyToSign = (currency: Currency): string => {
    switch (currency) {
      case 'EUR': return '€'
      case 'USD': return '$'
      case 'ILS': return '₪'
      default: throw new Error('Unknown currency type!')
    }
  }

  const goToStep = (step: AppartmentsRoutes): void => {
    navigate(`../${step}`)
  }

  return <Box className={styles.summary_container}>
    <Box>
      <Box className={styles.header_row}>
        <Typography variant="h5">{appartment.name}</Typography>
        <IconButton sx={{ color: theme.palette.primary.main }}
          aria-label="edit"
          onClick={() => { goToStep(AppartmentsRoutes.BASIC) }}>
          <EditIcon fontSize='small' />
        </IconButton>
      </Box>
      <Typography variant="body1" color={theme.palette.text.secondary}>
        {appartment.totalPrice} {mapCurrencyToSign(appartment.curency)} per room
      </Typography>
    </Box>

    <Box className={styles.header_row}>
      <Typography variant="h5">
        {appartment.location.country}
        {', ' + appartment.location.city}
        {appartment.location.district.length > 0
          ? ', ' + appartment.location.district
          : ''
        }</Typography>
      <IconButton sx={{ color: theme.palette.primary.main }}
        aria-label="edit"
        onClick={() => { goToStep(AppartmentsRoutes.LOCATION) }}>
        <EditIcon fontSize='small' />
      </IconButton>
    </Box>

    <Box>
      <Box className={styles.header_row}>
        <Typography variant="h5">Photos</Typography>
        <IconButton sx={{ color: theme.palette.primary.main }}
          aria-label="edit"
          onClick={() => { goToStep(AppartmentsRoutes.PHOTOS) }}>
          <EditIcon fontSize='small' />
        </IconButton>
      </Box>
      <ImageList cols={3} gap={8}>
        {appartment.photos.map((photo, index) => {
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
      appartment.description.length > 0 &&
      <Box>
        <Box className={styles.header_row}>
          <Typography variant="h5">Description</Typography>
          <IconButton sx={{ color: theme.palette.primary.main }}
            aria-label="edit"
            onClick={() => { goToStep(AppartmentsRoutes.ABOUT) }}>
            <EditIcon fontSize='small' />
          </IconButton>
        </Box>
        <Typography>{appartment.description}</Typography>
      </Box>
    }
  </Box>
}
