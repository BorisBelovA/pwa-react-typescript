import { Box, MenuItem, Select, Slider, TextField, Typography } from '@mui/material'
import styles from './Basic.module.scss'
import { useEffect, useState } from 'react'
import { AppartmentsRoutes, type Currency } from 'models'
import { appartmentQuestionnaireContext } from '../AppartmentQuestionnaire'
import { Controller, useForm } from 'react-hook-form'

export const Basic = (): JSX.Element => {
  const [currency, setCurrency] = useState<Currency>('ILS')
  const { appartment, setAppartment, setNextDisabled, setActive, setPercent } = appartmentQuestionnaireContext()

  useEffect(() => {
    setActive(AppartmentsRoutes.BASIC)
  }, [null])

  const { register, watch, control, formState: { errors, isValid }, reset } = useForm<{
    name: string | undefined
    price: number | undefined
    countRooms: number | undefined
    countAvailableRooms: number | undefined
  }>({
    defaultValues: {
      name: appartment.name ?? null,
      price: appartment.totalPrice ?? null,
      countRooms: appartment.countRooms ?? 5,
      countAvailableRooms: appartment.countAvailableRooms ?? 2
    },
    mode: 'all'
  })

  const refreshProgress = (): void => {
    const percent = (appartment.name && control.getFieldState('name').error === undefined ? 25 : 0) +
    (appartment.totalPrice && control.getFieldState('price').error === undefined ? 25 : 0) +
    (appartment.countRooms && control.getFieldState('countRooms').error === undefined ? 25 : 0) +
    (appartment.countAvailableRooms && control.getFieldState('countAvailableRooms').error === undefined ? 25 : 0)
    setPercent(percent, 100, AppartmentsRoutes.BASIC)
  }

  useEffect(() => {
    refreshProgress()
  }, [
    errors.name, errors.countAvailableRooms, errors.price, errors.countRooms,
    appartment.name, appartment.totalPrice, appartment.countRooms, appartment.countAvailableRooms  
  ])

  useEffect(() => {
    if (appartment.id > 0) {
      reset({
        name: appartment.name,
        price: appartment.totalPrice,
        countRooms: appartment.countRooms,
        countAvailableRooms: appartment.countAvailableRooms
      })
    }
  }, [appartment.id])

  useEffect(() => {
    const subss = watch(({ name, price, countAvailableRooms, countRooms }) => {
      setAppartment({
        ...appartment,
        name: name ?? appartment.name,
        totalPrice: price ?? appartment.totalPrice,
        countRooms: countRooms ?? appartment.countRooms,
        countAvailableRooms: countAvailableRooms ?? appartment.countAvailableRooms
      })
    })
    return () => { subss.unsubscribe() }
  }, [watch, errors])

  useEffect(() => {
    setNextDisabled(!isValid)
  }, [isValid])

  const howManyRoomsMarks = Array(9).fill(0).map((i, idx) => ({ value: idx + 2, label: `${idx + 2}` }))
  return <Box className={styles.container}>
    <Box className={styles.container_section}>
      <Typography variant="h2">Basic data</Typography>
      <TextField id="appartment-name"
        size="small"
        fullWidth
        label="Appartment name"
        variant="outlined"
        {...register('name', {
          required: 'Appartment name is required',
          minLength: { value: 4, message: 'Appartment name shouldn\'t be less then 4 symbols' }
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
            required: 'Appartment price is required',
            min: { value: 1, message: 'Appartment price shouldn\'t be less then 1' }
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
            min={2}
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
            min={2}
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
