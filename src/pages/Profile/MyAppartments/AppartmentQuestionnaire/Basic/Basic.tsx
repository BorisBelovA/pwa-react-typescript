import { Box, FormControlLabel, Slider, Switch, TextField, Typography } from '@mui/material'
import styles from './Basic.module.scss'
import { useEffect, useState } from 'react'
import { ApartmentsQuestionnaireRoutes } from 'models'
import { apartmentQuestionnaireContext } from '../AppartmentQuestionnaire'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { t } from '@lingui/macro'

export const Basic = (): JSX.Element => {
  const { apartment, setApartment, setNextDisabled, setActive, setPercent } = apartmentQuestionnaireContext()
  const [forRefugees, setForRefugees] = useState<boolean>(false)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get('status') === 'refugee') {
      setForRefugees(true)
      setApartment({
        ...apartment,
        forRefugees: true,
        totalPrice: 0
      })
    }
    if (apartment.totalPrice === 0) {
      setForRefugees(true)
      setApartment({
        ...apartment,
        forRefugees: true
      })
    }
  }, [searchParams])

  useEffect(() => {
    setActive(ApartmentsQuestionnaireRoutes.BASIC)
  }, [null])

  const { register, watch, control, formState: { errors, isValid }, reset, trigger } = useForm<{
    name: string | undefined
    price: number | undefined
    countRooms: number | undefined
    countAvailableRooms: number | undefined
  }>({
    defaultValues: {
      name: apartment.name ?? undefined,
      price: apartment.totalPrice ?? undefined,
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
    if (apartment.id) {
      reset({
        name: apartment.name ?? undefined,
        price: apartment.totalPrice ?? undefined,
        countRooms: apartment.countRooms ?? undefined,
        countAvailableRooms: apartment.countAvailableRooms ?? undefined
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
        countAvailableRooms: countAvailableRooms ?? apartment.countAvailableRooms,
        forRefugees: forRefugees ?? apartment.forRefugees
      })
    })
    return () => { subss.unsubscribe() }
  }, [watch, errors, forRefugees])

  useEffect(() => {
    setNextDisabled(!isValid)
  }, [isValid])

  useEffect(() => {
    void trigger('price')
    void trigger('countAvailableRooms')
  }, [apartment.forRefugees])

  const howManyRoomsMarks = Array(10).fill(0).map((i, idx) => ({ value: idx + 1, label: `${idx + 1}` }))
  return <Box className={styles.container}>
    <Box className={styles.container_section}>
      <FormControlLabel sx={{ marginLeft: '0px' }} control={
        <Switch checked={forRefugees}
          onChange={(event, value) => {
            setForRefugees(value)
            setApartment({
              ...apartment,
              forRefugees: value,
              totalPrice: value
                ? 0
                : null
            })
          }} />
      } label={t`For refugees`} />

      <Typography variant="h2">{t`Basic data`}</Typography>
      <TextField id="apartment-name"
        size="small"
        fullWidth
        label={t`Apartment name`}
        variant="outlined"
        {...register('name', {
          required: t`Apartment name is required`,
          minLength: { value: 4, message: t`Apartment name shouldn't be less then 4 symbols` }
        })}
        error={!(errors.name == null)}
        helperText={errors.name?.message ?? ''}
      />
    </Box>

    {!apartment.forRefugees &&
      <Box className={styles.container_section}>
        <Typography variant="h2">{t`Price per room in ₪`}</Typography>
        <Box className={styles.price_per_room}>
          <TextField id="price-per-room"
            size="small"
            fullWidth
            type='number'
            label={t`Price`}
            variant="outlined"
            {...register('price', {
              required: t`Apartment price is required`,
              min: { value: 1, message: t`Apartment price shouldn't be less then 1` }
            })}
            error={!(errors.price == null)}
            helperText={errors.price?.message ?? ''}
          />
        </Box>
      </Box>
    }

    <Box className={styles.container_section}>
      <Typography variant="h2">{t`How many`} {!apartment.forRefugees ? t`rooms` : t`people you can accept`}?</Typography>
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
      <Typography variant="h2">{t`How many available rooms?`}</Typography>
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
