import { Box, TextField, Typography } from '@mui/material'
import { apartmentQuestionnaireContext } from '../AppartmentQuestionnaire'
import { useEffect, useState } from 'react'
import { ApartmentsQuestionnaireRoutes } from 'models'
import styles from './Description.module.scss'

export const Description = (): JSX.Element => {
  const { apartment, setApartment, setPercent, setActive, setNextDisabled } = apartmentQuestionnaireContext()

  useEffect(() => {
    setNextDisabled(false)
    setActive(ApartmentsQuestionnaireRoutes.ABOUT)
  }, [])

  const [description, setDescription] = useState(apartment.description ?? '')

  useEffect(() => {
    setPercent(apartment.description.length > 0 ? 100 : 0, 100, ApartmentsQuestionnaireRoutes.ABOUT)
  }, [apartment.description])

  useEffect(() => {
    if (description !== apartment.description) {
      setApartment({ ...apartment, description })
    }
  }, [description])

  return <Box className={styles.description_container}>
    <Typography variant='h2'>Few words about apartment</Typography>
    <TextField className={styles.description_input_container}
      sx={{ marginTop: '1rem', height: '90%' }}
      fullWidth
      label="apartment description"
      multiline
      rows={20}
      value={description}
      inputProps={{ style: { height: '90%' }}}
      onChange={(event) => {
        setDescription(event.target.value)
      }}
    />
  </Box>
}
