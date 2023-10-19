import { Box, TextField, Typography } from '@mui/material'
import { apartmentQuestionnaireContext } from '../AppartmentQuestionnaire'
import { useEffect, useState } from 'react'
import { ApartmentsQuestionnaireRoutes } from 'models'
import styles from './Description.module.scss'
import { useForm } from 'react-hook-form'
import Phone from 'src/components/BasicInfoSteps/Phone'

export const Description = (): JSX.Element => {
  const { apartment, setApartment, setPercent, setActive, setNextDisabled } = apartmentQuestionnaireContext()

  const [description, setDescription] = useState(apartment.description ?? '')
  const { control, watch, formState: { isValid }, trigger } = useForm<{ phone: string }>({
    defaultValues: {
      phone: apartment.phone ?? undefined
    },
    mode: 'all'
  })

  useEffect(() => {
    void trigger('phone')
    setActive(ApartmentsQuestionnaireRoutes.ABOUT)
  }, [])

  useEffect(() => {
    setNextDisabled(!isValid)
  }, [isValid])

  useEffect(() => {
    const subscription = watch(({ phone }) => {
      setApartment({ ...apartment, phone: phone ?? null })
    })
    return () => { subscription.unsubscribe() }
  }, [watch, isValid])

  useEffect(() => {
    setPercent((apartment.description?.length ?? 0) > 0 ? 100 : 0, 100, ApartmentsQuestionnaireRoutes.ABOUT)
  }, [apartment.description])

  useEffect(() => {
    if (description !== apartment.description) {
      setApartment({ ...apartment, description })
    }
  }, [description])

  return <Box className={styles.description_container}>
    <Box className={styles.description_item}>
      <Typography variant='h2'>Your phone number</Typography>
      <Phone control={control} required={true} />
    </Box>
    <Box className={styles.description_item}>
      <Typography variant='h2'>Few words about apartment</Typography>
      <TextField className={styles.description_input_container}
        sx={{ height: '90%' }}
        fullWidth
        placeholder={
          'Here you can specify: \n - Another ways to contact you \n - How many people can stay \n - Any other useful information'
        }
        multiline
        rows={20}
        value={description}
        inputProps={{ style: { height: '90%' } }}
        onChange={(event) => {
          setDescription(event.target.value)
        }}
      />
    </Box>

  </Box>
}
