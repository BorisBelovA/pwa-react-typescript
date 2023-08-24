import { Box, MenuItem, Select, Slider, TextField, Typography } from '@mui/material'
import styles from './Basic.module.scss'
import { useEffect, useState } from 'react'
import { ApartmentsQuestionnaireRoutes, type Currency } from 'models'
import { apartmentQuestionnaireContext } from '../AppartmentQuestionnaire'
import { Controller, useForm } from 'react-hook-form'

export const Basic = (): JSX.Element => {
  const [currency, setCurrency] = useState<Currency>('ILS')
  const { apartment, setApartment, setNextDisabled, setActive, setPercent } = apartmentQuestionnaireContext()

  useEffect(() => {
    setActive(ApartmentsQuestionnaireRoutes.BASIC)
  }, [null])

  const { register, watch, control, formState: { errors, isValid }, reset } = useForm<{
    name: string | undefined
    price: number | undefined
    countRooms: number | undefined
    countAvailableRooms: number | undefined
  }>({
    defaultValues: {
      name: apartment.name ?? null,
      price: apartment.totalPrice ?? null,
      countRooms: apartment.countRooms ?? 5,
      countAvailableRooms: apartment.countAvailableRooms ?? 2
    },
    mode: 'all'
  })

  const refreshProgress = (): void => {
    const percent = (apartment.name && control.getFieldState('name').error === undefined ? 25 : 0) +
    (apartment.totalPrice && control.getFieldState('price').error === undefined ? 25 : 0) +
    (apartment.countRooms && control.getFieldState('countRooms').error === undefined ? 25 : 0) +
    (apartment.countAvailableRooms && control.getFieldState('countAvailableRooms').error === undefined ? 25 : 0)
    setPercent(percent, 100, ApartmentsQuestionnaireRoutes.BASIC)
  }

  useEffect(() => {
    refreshProgress()
  }, [
    errors.name, errors.countAvailableRooms, errors.price, errors.countRooms,
    apartment.name, apartment.totalPrice, apartment.countRooms, apartment.countAvailableRooms
  ])

  useEffect(() => {
    if (apartment.id > 0) {
      reset({
        name: apartment.name,
        price: apartment.totalPrice,
        countRooms: apartment.countRooms,
        countAvailableRooms: apartment.countAvailableRooms
      })
    }
  }, [apartment.id])

  useEffect(() => {
    const subss = watch(({ name, price, countAvailableRooms, countRooms }) => {
      setApartment({
        ...apartment,
        name: name ?? apartment.name,
        totalPrice: price ?? apartment.totalPrice,
        countRooms: countRooms ?? apartment.countRooms,
        countAvailableRooms: countAvailableRooms ?? apartment.countAvailableRooms
      })
    })
    return () => { subss.unsubscribe() }
  }, [watch, errors])

  useEffect(() => {
    setApartment({
      ...apartment,
      currency
    })
  }, [currency])

  useEffect(() => {
    setNextDisabled(!isValid)
  }, [isValid])

  const howManyRoomsMarks = Array(10).fill(0).map((i, idx) => ({ value: idx + 1, label: `${idx + 1}` }))
  return <Box className={styles.container}>
    <Box className={styles.container_section}>
      <Typography variant="h2">Basic data</Typography>
      <TextField id="apartment-name"
        size="small"
        fullWidth
        label="Apartment name"
        variant="outlined"
        {...register('name', {
          required: 'Apartment name is required',
          minLength: { value: 4, message: 'Apartment name shouldn\'t be less then 4 symbols' }
        })}
        error={!(errors.name == null)}
        helperText={errors.name?.message ?? ''}
      />
    </Box>

    <Box className={styles.container_section}>
      <Typography variant="h2">Price per room</Typography>
      <Box className={styles.price_per_room}>
        <TextField id="price-per-room"
          size="small"
          fullWidth
          type='number'
          label="Price"
          variant="outlined"
          {...register('price', {
            required: 'Apartment price is required',
            min: { value: 1, message: 'Apartment price shouldn\'t be less then 1' }
          })}
          error={!(errors.price == null)}
          helperText={errors.price?.message ?? ''}
        />
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          size="small"
          value={currency}
          onChange={(event) => { setCurrency(event.target.value as Currency) }}
        >
          <MenuItem value={'USD'}>$</MenuItem>
          <MenuItem value={'EUR'}>€</MenuItem>
          <MenuItem value={'ILS'}>₪</MenuItem>
        </Select>
      </Box>
    </Box>

    <Box className={styles.container_section}>
      <Typography variant="h2">How many rooms?</Typography>
      <Controller
        render={({ field: { onChange, onBlur, value, ref } }) =>
          <Slider sx={{ width: '94%', margin: '0 auto' }}
            aria-label="How many rooms?"
            defaultValue={5}
            valueLabelDisplay="off"
            step={1}
            marks={howManyRoomsMarks}
            min={1}
            max={10}
            value={value}
            onChange={onChange}
          />
        }
        name='countRooms'
        control={control}
      />
    </Box>

    <Box className={styles.container_section}>
      <Typography variant="h2">How many available rooms?</Typography>
      <Controller
        render={({ field: { onChange, onBlur, value, ref } }) =>
          <Slider sx={{ width: '94%', margin: '0 auto' }}
            aria-label="How many available rooms?"
            defaultValue={5}
            valueLabelDisplay="off"
            step={1}
            marks={howManyRoomsMarks}
            min={1}
            max={10}
            value={value}
            onChange={onChange}
          />
        }
        name='countAvailableRooms'
        control={control}
      />
    </Box>
  </Box>
}
