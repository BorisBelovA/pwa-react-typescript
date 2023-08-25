import { useEffect, useState } from 'react'
import styles from './Location.module.scss'
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { ApartmentsQuestionnaireRoutes, type City, type District, type Country, QuestionnaireRoutes } from 'models'
import { locationService } from 'src/api/api-services/location'
import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import commonStyles from '../BasicQuestions.module.scss'
import { useNavigate } from 'react-router-dom'
import { useMainContext } from 'src/layouts/Main/MainLayout'
import { useStore } from 'src/utils/StoreProvider'
import { questionnaireService } from 'api-services'

export const Location = (): JSX.Element => {
  const { questions, setQuestions, setActive, setPercent } = useBasicQuestions()
  const navigate = useNavigate()
  const [countries, setCountries] = useState<Country[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [nextDisabled, setNextDisabled] = useState(true)
  const { questionnaireStore } = useStore()

  const {
    setBackdropVisible,
    setBackdropMessage,
    setMessage
  } = useMainContext()

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

  const { control, watch, formState: { errors } } = useForm<{
    country: Country | null
    city: City | null
    state: District | null
  }>({
    defaultValues: {
      country: questions.location.country ?? null,
      city: questions.location.city ?? null,
      state: questions.location.state ?? null
    },
    mode: 'all'
  })

  // Load list of cities and districts if we came back to this page
  useEffect(() => {
    void getCountries()

    const { country, state } = questions.location
    if (country) {
      void getDistricts(country.id)
    }
    if (state) {
      void getCities(state.id)
    }
  }, [])

  const refreshProgress = (): void => {
    const { country, city, state } = questions.location
    const percent = (country && control.getFieldState('country').error === undefined ? 33 : 0) +
      (city && control.getFieldState('city').error === undefined ? 33 : 0) +
      (state && control.getFieldState('state').error === undefined ? 34 : 0)
    setPercent(percent, 100, ApartmentsQuestionnaireRoutes.LOCATION)
  }

  useEffect(() => {
    refreshProgress()
  }, [
    errors.country, errors.city, errors.state,
    questions.location.country, questions.location.city, questions.location.state
  ])

  useEffect(() => {
    const subss = watch(({ country, city, state }, { name, type }) => {
      // Each time we change country we load new list of districts
      if (name === 'country' && country?.id) {
        void getDistricts(country.id)
        setQuestions({
          ...questions,
          location: {
            country: country as unknown as Country,
            city: null,
            state: null
          }
        })
      }
      // Each time we change district we load list of cicites
      if (name === 'state' && state?.id) {
        void getCities(state.id)
        setQuestions({
          ...questions,
          location: {
            // ...questions.location,
            country: country as unknown as Country,
            state: state as unknown as District,
            city: null
          }
        })
      }

      // Each time we change district we load list of cicites
      if (name === 'city' && city?.id) {
        setQuestions({
          ...questions,
          location: {
            country: country as unknown as Country,
            state: state as unknown as District,
            city: city as unknown as City
          }
        })
      }
      setNextDisabled(!(country?.id && state?.id))
    })
    return () => { subss.unsubscribe() }
  }, [watch])

  useEffect(() => {
    const { country, state } = questions.location
    setNextDisabled(!(country?.id && state?.id))
    setActive(ApartmentsQuestionnaireRoutes.LOCATION)
  }, [])

  const unlinkApartment = async (): Promise<void> => {
    if (questionnaireStore.questionnaire?.apartment?.id) {
      try {
        setBackdropVisible(true)
        setBackdropMessage('Unlinking apartment')

        const dto = await questionnaireService.updateQuestForm({ ...questions, apartment: null })
        setQuestions({ ...questions, apartment: null })
        questionnaireStore.setQuestionnaire({
          ...questions,
          id: dto.id
        })

        setTimeout(() => {
          setBackdropMessage('Almost done')
        }, 1000)

        setBackdropVisible(false)
      } catch (error) {
        console.error(error)
        setBackdropVisible(false)
        if (error instanceof Error) {
          setMessage({
            visible: true,
            text: error.message,
            severity: 'error'
          })
        }
      }
    } else {
      setQuestions({ ...questions, apartment: null })
    }
  }

  return <Box className={commonStyles.question}>
    <Box className={commonStyles.question__content}>
      {questions.apartment &&
        <Box className={styles.alert}>
          <Typography>To change location you need to unlink your apartment first</Typography>
          <Button variant='contained' onClick={() => { void unlinkApartment() }}>Unlink</Button>
        </Box>
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
                disabled={!!questions.apartment}
                options={countries}
                fullWidth
                onChange={(_, value) => {
                  onChange(value ?? null)
                }}
                onBlur={onBlur}
                ref={ref}
                value={
                  questions.location.country
                    ? countries.find(c => c.id === questions.location.country?.id) ?? null
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
        <Typography variant="h2">State</Typography>
        <Controller control={control}
          name="state"
          render={
            ({ field: { onChange, value, onBlur, ref } }) =>
              <Autocomplete
                id="district-autocomplete"
                options={districts}
                fullWidth
                disabled={districts.length === 0 || !!questions.apartment}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => {
                  onChange(value ?? null)
                }}
                value={
                  questions.location.state?.id
                    ? districts.find(c => c.id === questions.location.state?.id) ?? null
                    : null
                }
                onBlur={onBlur}
                ref={ref}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a state"
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
                disabled={cities.length === 0 || !!questions.apartment}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => {
                  onChange(value ?? null)
                }}
                value={
                  questions.location.city?.id
                    ? cities.find(c => c.id === questions.location.city!.id) ?? null
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
    </Box>

    <Box className={commonStyles.question__nav}>
      <Button variant='outlined'
        fullWidth
        onClick={() => {
          navigate(`../${QuestionnaireRoutes.GUESTS}`)
        }}>
        Back
      </Button>
      <Button variant='contained'
        disabled={nextDisabled}
        fullWidth
        onClick={() => {
          navigate(`../${QuestionnaireRoutes.APARTMENT}`)
        }}>
        Next
      </Button>
    </Box>
  </Box>
}
