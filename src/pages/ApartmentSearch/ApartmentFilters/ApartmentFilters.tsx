import { Autocomplete, Box, Button, FormControlLabel, Switch, TextField, Typography } from '@mui/material'
import BackButton from 'src/components/Buttons/BackButton/BackButton'
import styles from './ApartmentFilters.module.scss'
import { type City, type Country, type District } from 'models'
import { Controller, useForm } from 'react-hook-form'
import { useStore } from 'src/utils/StoreProvider'
import { useEffect, useState } from 'react'
import { locationService } from 'src/api/api-services/location'
import { useNavigate, useSearchParams } from 'react-router-dom'

const ApartmentFilters = (): JSX.Element => {
  const { apartmentFiltersStore, apartmentSearchStore } = useStore()
  const [countries, setCountries] = useState<Country[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [forRefugee, setForRefugee] = useState<boolean>(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (searchParams.get('status') === 'refugee' ||
      (apartmentFiltersStore.priceFrom === 0 &&
        apartmentFiltersStore.priceTo === 0)) {
      setForRefugee(true)
      apartmentFiltersStore.setPrice(0, 0)
    }
  }, [searchParams])

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

  const resetFilters = (): void => {
    reset({
      country: null,
      city: null,
      district: null,
      priceFrom: 0,
      priceTo: 20000
    })
    setForRefugee(false)
    apartmentFiltersStore.reset()
  }

  // Load list of cities and districts if we came back to this page
  useEffect(() => {
    void getCountries()
    if (apartmentFiltersStore.country?.id) void getDistricts(apartmentFiltersStore.country.id)
    if (apartmentFiltersStore.state?.id) {
      void getCities(apartmentFiltersStore.state.id)
    }
  }, [])

  const { control, register, watch, resetField, formState: { errors }, reset, setValue } = useForm<{
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
    const subss = watch(({ country, city, district, priceFrom, priceTo }, { name, type }) => {
      // Each time we change country we load new list of districts
      apartmentSearchStore.resetApartments()
      if (name === 'country' && country?.id) {
        void getDistricts(country.id)
      } else if (name === 'country' && !country?.id) {
        setDistricts([])
        setCities([])
        apartmentFiltersStore.setState(undefined)
        apartmentFiltersStore.setCity(undefined)
      }
      // Each time we change district we load list of cicites
      if (name === 'district' && district?.id) {
        void getCities(district.id)
      } else if (name === 'district' && !district?.id) {
        setCities([])
        apartmentFiltersStore.setCity(undefined)
      }
      apartmentFiltersStore.setPrice(priceFrom, priceTo)
    })
    return () => { subss.unsubscribe() }
  }, [watch])

  return (
    <Box className={styles.container}>
      <Box className={styles.head}>
        <BackButton to='/apartment-search' />
        <Typography variant='h1'>Apartment Filters</Typography>
      </Box>
      <Box className={styles.location__container}>
        <Box className={styles.container_section}>
          <Typography variant="h2">Country</Typography>
          <Controller control={control}
            name="country"
            render={
              ({ field: { onChange, value, onBlur, ref } }) =>
                <Autocomplete
                  id="country-autocomplete"
                  options={countries}
                  fullWidth
                  onChange={(_, value) => {
                    onChange(value ?? null)
                    apartmentFiltersStore.setCountry(value?.id ?? undefined)
                    resetField('district')
                    resetField('city')
                  }}
                  onBlur={onBlur}
                  ref={ref}
                  value={
                    apartmentFiltersStore.country
                      ? countries.find(c => c.id === apartmentFiltersStore.country?.id) ?? null
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
                    apartmentFiltersStore.setState(value?.id ?? undefined)
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
                    apartmentFiltersStore.setCity(value?.id ?? undefined)
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
      <Box className={styles.budget__container}>
        <FormControlLabel sx={{ marginLeft: '0px' }} control={
          <Switch checked={forRefugee}
            onChange={(event, value) => {
              setForRefugee(value)
              setValue('priceFrom', value ? 0 : 1)
              setValue('priceTo', value ? 0 : 20000)
            }} />
        } label="For refugees" />
        {!forRefugee && <Box className={styles.budget__container}>
          <Typography variant='h1'>Budget in ₪</Typography>
          <Box className={styles.budget__inputs}>
            <Box className={styles.container_section}>
              <Typography variant="h2">From</Typography>
              <TextField id="apartment-address"
                type='number'
                size="medium"
                fullWidth
                variant="outlined"
                {...register('priceFrom')}
                error={!(errors.priceFrom == null)}
                helperText={errors.priceFrom?.message ?? ''}
              />
            </Box>
            <Box className={styles.container_section}>
              <Typography variant="h2">To</Typography>
              <TextField id="apartment-address"
                type='number'
                size="medium"
                fullWidth
                variant="outlined"
                {...register('priceTo')}
                error={!(errors.priceTo == null)}
                helperText={errors.priceTo?.message ?? ''}
              />
            </Box>
          </Box>
        </Box>}
        <Box className={styles.container_section}>
          <Button variant='outlined' fullWidth onClick={() => { resetFilters() }}>Reset filters</Button>
          <Button variant='contained' fullWidth onClick={() => {
            navigate('/apartment-search')
          }}>Find apartments</Button>
        </Box>
      </Box>
    </Box>
  )
}
export default ApartmentFilters
