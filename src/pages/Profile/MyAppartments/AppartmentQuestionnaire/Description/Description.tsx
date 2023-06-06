import { Box, TextField, Typography } from '@mui/material'
import { appartmentQuestionnaireContext } from '../AppartmentQuestionnaire'
import { useEffect, useState } from 'react'
import { AppartmentsQuestionnaireRoutes } from 'models'

export const Description = (): JSX.Element => {
  const { appartment, setAppartment, setPercent, setActive, setNextDisabled } = appartmentQuestionnaireContext()

  useEffect(() => {
    setNextDisabled(false)
    setActive(AppartmentsQuestionnaireRoutes.ABOUT)
  }, [])

  const [description, setDescription] = useState(appartment.description ?? '')

  useEffect(() => {
    setPercent(appartment.description.length > 0 ? 100 : 0, 100, AppartmentsQuestionnaireRoutes.ABOUT)
  }, [appartment.description])

  useEffect(() => {
    if (description !== appartment.description) {
      setAppartment({ ...appartment, description })
    }
  }, [description])

  return <Box>
    <Typography variant='h2'>Few words about appartment</Typography>
    <TextField sx={{ marginTop: '1rem' }}
      fullWidth
      label="Appartment description"
      multiline
      value={description}
      rows={20}
      onChange={(event) => {
        setDescription(event.target.value)
      }}
    />
  </Box>
}
