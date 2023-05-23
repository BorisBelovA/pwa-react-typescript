import { useEffect } from 'react'
import { appartmentQuestionnaireContext } from '../AppartmentQuestionnaire'
import styles from './Location.module.scss'
import { Autocomplete, Box, TextField, Typography } from '@mui/material'
import { countries } from './countries'
import { Controller, useForm } from 'react-hook-form'
import { AppartmentsRoutes } from 'models'

export const Location = (): JSX.Element => {
  const { appartment, setAppartment, setNextDisabled, setActive, setPercent } = appartmentQuestionnaireContext()

  const { control, watch, reset, formState: { errors, isValid } } = useForm<{
    country: string | null
    city: string | null
    district: string | null
  }>({
    defaultValues: {
      country: appartment.location.country ?? null,
      city: appartment.location.city ?? null,
      district: appartment.location.district ?? null
    },
    mode: 'all'
  })

  const refreshProgress = (): void => {
    const { country, city, district } = appartment.location
    const percent = (country && control.getFieldState('country').error === undefined ? 33 : 0) +
    (city && control.getFieldState('city').error === undefined ? 33 : 0) +
    (district && control.getFieldState('district').error === undefined ? 34 : 0)
    setPercent(percent, 100, AppartmentsRoutes.LOCATION)
  }

  useEffect(() => {
    refreshProgress()
  }, [
    errors.country, errors.city, errors.district,
    appartment.location.country, appartment.location.city, appartment.location.district
  ])

  useEffect(() => {
    if (appartment.id > 0) {
      reset({
        country: appartment.location.country,
        city: appartment.location.city,
        district: appartment.location.district
      })
    }
  }, [appartment.id])

  useEffect(() => {
    setNextDisabled(!isValid)
  }, [isValid])

  useEffect(() => {
    const subss = watch(({ country, city, district }) => {
      setAppartment({
        ...appartment,
        location: {
          country: country ?? appartment.location.country,
          city: city ?? appartment.location.city,
          district: district ?? appartment.location.district
        }
      })
    })
    return () => { subss.unsubscribe() }
  }, [watch])

  useEffect(() => {
    setActive(AppartmentsRoutes.LOCATION)
  }, [])

  return <>
    <Box className={styles.container}>
      <Box className={styles.container_section}>
        <Typography variant="h2">Country</Typography>
        <Controller control={control}
          name="country"
          rules={{
            required: true
          }}
          render={
            ({ field: { onChange, value, onBlur, ref } }) =>
              <Autocomplete
                id="country-autocomplete"
                options={countries}
                fullWidth
                onChange={(_, value) => {
                  onChange(value?.name ?? null)
                }}
                onBlur={onBlur}
                ref={ref}
                value={
                  appartment.location.country
                    ? countries.find(c => c.name === appartment.location.country)
                    : null
                }
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <img loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.name}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={errors.country !== undefined}
                    helperText={errors.country !== undefined ? 'Country is required' : ''}
                    label="Choose a country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password' // disable autocomplete and autofill
                    }}
                  />
                )}
              />
          } />
      </Box>

      <Box className={styles.container_section}>
        <Typography variant="h2">City</Typography>
        <Controller control={control}
          name="city"
          rules={{
            required: true
          }}
          render={
            ({ field: { onChange, value, onBlur, ref } }) =>
              <Autocomplete
                id="city-autocomplete"
                options={countries}
                fullWidth
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => {
                  onChange(value?.name ?? null)
                }}
                value={
                  appartment.location.city
                    ? countries.find(c => c.name === appartment.location.city)
                    : null
                }
                onBlur={onBlur}
                ref={ref}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a city"
                    error={errors.city !== undefined}
                    helperText={errors.city !== undefined ? 'City is required' : ''}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password' // disable autocomplete and autofill
                    }}
                  />
                )}
              />
          }
        />
      </Box>

      <Box className={styles.container_section}>
        <Typography variant="h2">District</Typography>
        <Controller control={control}
          name="district"
          render={
            ({ field: { onChange, value, onBlur, ref } }) =>
              <Autocomplete
                id="district-autocomplete"
                options={countries}
                fullWidth
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => {
                  onChange(value?.name ?? null)
                }}
                value={
                  appartment.location.district
                    ? countries.find(c => c.name === appartment.location.district)
                    : null
                }
                onBlur={onBlur}
                ref={ref}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a district"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password' // disable autocomplete and autofill
                    }}
                  />
                )}
              />
          }
        />
      </Box>
    </Box>
  </>
}
