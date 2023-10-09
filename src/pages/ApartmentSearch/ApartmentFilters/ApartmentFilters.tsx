import { Autocomplete, Box, TextField, Typography } from '@mui/material'
import BackButton from 'src/components/Buttons/BackButton/BackButton'
import styles from './ApartmentFilters.module.scss'
import { type City, type Country, type District } from 'models'
import { Controller, useForm } from 'react-hook-form'
import { useStore } from 'src/utils/StoreProvider'
import { useEffect, useState } from 'react'
import { locationService } from 'src/api/api-services/location'

const ApartmentFilters = (): JSX.Element => {
  const { apartmentFiltersStore } = useStore()
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

  // Load list of cities and districts if we came back to this page
  useEffect(() => {
    void getCountries()
    void getDistricts(apartmentFiltersStore.country.id)
  }, [])

  const { control, register, watch, reset, resetField, formState: { errors } } = useForm<{
    country: Country | null
    city: City | null
    district: District | null
    priceFrom: number
    priceTo: number
  }>({
    defaultValues: {
      country: apartmentFiltersStore.country ?? null,
      city: apartmentFiltersStore.city ?? null,
      district: apartmentFiltersStore.state ?? null,
      priceFrom: apartmentFiltersStore.priceFrom,
      priceTo: apartmentFiltersStore.priceTo
    },
    mode: 'all'
  })

  useEffect(() => {
    const subss = watch(({ country, city, district }, { name, type }) => {
      // Each time we change country we load new list of districts
      if (name === 'country' && country?.id) {
        void getDistricts(country.id)
      }
      // Each time we change district we load list of cicites
      if (name === 'district' && district?.id) {
        void getCities(district.id)
      }
    })
    return () => { subss.unsubscribe() }
  }, [watch])

  return (
    <Box>
      <Box className={styles.head}>
        <BackButton />
        <Typography variant='h1'>ApartmentFilters</Typography>
      </Box>
      <Box className={styles.location__container}>
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
                    onChange(value ?? null)
                    resetField('district')
                    resetField('city')
                  }}
                  onBlur={onBlur}
                  ref={ref}
                  value={
                    apartmentFiltersStore.country
                      ? countries.find(c => c.id === apartmentFiltersStore.country.id) ?? null
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
            render={
              ({ field: { onChange, value, onBlur, ref } }) =>
                <Autocomplete
                  id="district-autocomplete"
                  options={districts}
                  fullWidth
                  disabled={districts.length === 0}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, value) => {
                    onChange(value ?? null)
                    resetField('city')
                  }}
                  value={
                    apartmentFiltersStore.state
                      ? districts.find(c => c.id === apartmentFiltersStore.state?.id) ?? null
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
                  disabled={cities.length === 0}
                  getOptionLabel={(option) => option.name}
                  onChange={(_, value) => {
                    onChange(value ?? null)
                  }}
                  value={
                    apartmentFiltersStore.city
                      ? cities.find(c => c.id === apartmentFiltersStore.city?.id) ?? null
                      : null
                  }
                  onBlur={onBlur}
                  ref={ref}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a city"
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
    </Box>
  )
}
export default ApartmentFilters
