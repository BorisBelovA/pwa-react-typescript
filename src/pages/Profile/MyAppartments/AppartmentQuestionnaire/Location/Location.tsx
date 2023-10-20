import { useEffect, useState } from 'react'
import { apartmentQuestionnaireContext } from '../AppartmentQuestionnaire'
import styles from './Location.module.scss'
import { Autocomplete, Box, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { ApartmentsQuestionnaireRoutes, type City, type District, type Country } from 'models'
import { locationService } from 'api/api-services/location'

export const Location = (): JSX.Element => {
  const { apartment, setApartment, setNextDisabled, setActive, setPercent, lockLocation } = apartmentQuestionnaireContext()

  const [countries, setCountries] = useState<Country[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [cities, setCities] = useState<City[]>([])

  const getCountries = async (): Promise<void> => {
    try {
      const c = await locationService.getCountries()
      setCountries(c)
    } catch (e) {
      console.error(e)
    }
  }

  const getDistricts = async (countryId: number): Promise<void> => {
    try {
      const d = await locationService.getDistrictsByCountry(countryId)
      setDistricts(d)
    } catch (e) {
      console.error(e)
    }
  }

  const getCities = async (districtId: number): Promise<void> => {
    try {
      const d = await locationService.getCitiesByDistrictId(districtId)
      setCities(d)
    } catch (e) {
      console.error(e)
    }
  }

  const { control, register, watch, reset, resetField, formState: { errors } } = useForm<{
    country: Country | null
    city: City | null
    district: District | null
    address: string | null
  }>({
    defaultValues: {
      country: apartment.location.country ?? null,
      city: apartment.location.city ?? null,
      district: apartment.location.district ?? null,
      address: apartment.location.address ?? null
    },
    mode: 'all'
  })

  // Load list of cities and districts if we came back to this page
  useEffect(() => {
    void getCountries()

    const { country, district } = apartment.location
    if (country) {
      void getDistricts(country.id)
    }
    if (district) {
      void getCities(district.id)
    }
  }, [])

  const refreshProgress = (): void => {
    const { country, city, district } = apartment.location
    const percent = (country && control.getFieldState('country').error === undefined ? 33 : 0) +
      (city && control.getFieldState('city').error === undefined ? 33 : 0) +
      (district && control.getFieldState('district').error === undefined ? 34 : 0)
    setPercent(percent, 100, ApartmentsQuestionnaireRoutes.LOCATION)
  }

  useEffect(() => {
    refreshProgress()
    setNextDisabled(Object.keys(errors).length !== 0 || !apartment.location.country ||
      !apartment.location.district || !apartment.location.city)
  }, [
    errors.country, errors.city, errors.district,
    apartment.location.country, apartment.location.city, apartment.location.district
  ])

  useEffect(() => {
    if (apartment.id) {
      reset({
        country: apartment.location.country,
        city: apartment.location.city,
        district: apartment.location.district
      })
    }
  }, [apartment.id])

  useEffect(() => {
    const subss = watch(({ country, city, district, address }, { name, type }) => {
      // Each time we change country we load new list of districts
      if (name === 'country' && country?.id) {
        void getDistricts(country.id)
      }
      // Each time we change district we load list of cicites
      if (name === 'district' && district?.id) {
        void getCities(district.id)
      }

      setApartment({
        ...apartment,
        location: {
          country: country as unknown as Country ?? apartment.location.country,
          city: city as unknown as City ?? apartment.location.city,
          district: district as unknown as District ?? apartment.location.district,
          address: address ?? apartment.location.address
        }
      })
    })
    return () => { subss.unsubscribe() }
  }, [watch])

  useEffect(() => {
    setActive(ApartmentsQuestionnaireRoutes.LOCATION)
  }, [])

  return <>
    <Box className={styles.container}>
      {lockLocation &&
        <Typography variant='caption'>
          This apartment is used in your questionnaire. You can change its location after you update your questionnaire.
        </Typography>
      }
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
                disabled={lockLocation}
                fullWidth
                onChange={(_, value) => {
                  onChange(value ?? null)
                  resetField('district')
                  resetField('city')
                }}
                onBlur={onBlur}
                ref={ref}
                value={
                  apartment.location.country?.id
                    ? countries.find(c => c.id === apartment.location.country!.id) ?? null
                    : null
                }
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <Box sx={{ marginRight: '0.5rem' }}>{option.emoji}</Box>
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
        <Typography variant="h2">District</Typography>
        <Controller control={control}
          name="district"
          rules={{
            required: true
          }}
          render={
            ({ field: { onChange, value, onBlur, ref } }) =>
              <Autocomplete
                id="district-autocomplete"
                options={districts}
                fullWidth
                disabled={lockLocation || districts.length === 0}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => {
                  onChange(value ?? null)
                  resetField('city')
                }}
                value={
                  apartment.location.district?.id
                    ? districts.find(c => c.id === apartment.location.district?.id) ?? null
                    : null
                }
                onBlur={onBlur}
                ref={ref}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a district"
                    error={errors.district !== undefined}
                    helperText={errors.district !== undefined ? 'District is required' : ''}
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
                options={cities}
                fullWidth
                disabled={lockLocation || cities.length === 0}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => {
                  onChange(value ?? null)
                }}
                value={
                  apartment.location.city?.id
                    ? cities.find(c => c.id === apartment.location.city!.id) ?? null
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
        <Typography variant="h2">Address</Typography>
        <TextField id="apartment-address"
          size="medium"
          fullWidth
          label="Apartment address"
          variant="outlined"
          {...register('address', {
            minLength: { value: 4, message: 'Apartment address shouldn\'t be less then 4 symbols' }
          })}
          error={!(errors.address == null)}
          helperText={errors.address?.message ?? ''}
        />
      </Box>
    </Box>
  </>
}
