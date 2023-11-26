import { Box, Button, Slider, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useBasicQuestions } from 'layouts/QuestionnaireBasic/QuestionnaireBasic'
import styles from './NotAlone.module.scss'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { QuestionnaireRoutes } from 'models'
import { t } from '@lingui/macro'

export const NotAlone = (): JSX.Element => {
  const { questions, setQuestions, setPercent, setActive } = useBasicQuestions()
  const navigate = useNavigate()

  useEffect(() => {
    setActive('not-alone')
  }, [])

  const { watch, control } = useForm<{
    countAdults: number | undefined
    countKids: number | undefined
  }>({
    defaultValues: {
      countKids: questions.countKids ?? 0,
      countAdults: questions.countAdults ?? 0
    },
    mode: 'all'
  })

  useEffect(() => {
    const subss = watch(({ countAdults, countKids }) => {
      setQuestions({
        ...questions,
        countAdults: countAdults ?? questions.countAdults,
        countKids: countKids ?? questions.countKids
      })
    })
    return () => { subss.unsubscribe() }
  }, [watch])

  const countPerson = useMemo(() => {
    return (questions.countAdults ?? 0) + (questions.countKids ?? 0)
  }, [questions.countKids, questions.countAdults])

  const howManyRoomsMarks = Array(11).fill(0).map((i, idx) => ({ value: idx, label: `${idx}` }))

  const handleBack = (): void => {
    navigate(`/profile/questionnaire-basic-info/${QuestionnaireRoutes.WHO}`)
  }

  const handleNext = (): void => {
    setPercent(100, 100, 'not-alone')
    navigate(`/profile/questionnaire-basic-info/${QuestionnaireRoutes.PETS}`)
  }

  return <Box className={styles.container}>
    <Typography variant='h2'>{t`Not Alone`}</Typography>

    <Box className={styles.container_section}>
      <Typography variant='h2'>{t`How many adults?`}</Typography>
      <Controller
        render={({ field: { onChange, onBlur, value, ref } }) =>
          <Slider sx={{ width: '94%', margin: '0 auto' }}
            aria-label='How many rooms?'
            defaultValue={0}
            valueLabelDisplay='off'
            step={1}
            marks={howManyRoomsMarks}
            min={0}
            max={10}
            value={value}
            onChange={onChange}
          />
        }
        name='countAdults'
        control={control}
      />
    </Box>

    <Box className={styles.container_section}>
      <Typography variant='h2'>{t`How many kids?`}</Typography>
      <Controller
        render={({ field: { onChange, onBlur, value, ref } }) =>
          <Slider sx={{ width: '94%', margin: '0 auto' }}
            aria-label='How many rooms?'
            defaultValue={0}
            valueLabelDisplay='off'
            step={1}
            marks={howManyRoomsMarks}
            min={0}
            max={10}
            value={value}
            onChange={onChange}
          />
        }
        name='countKids'
        control={control}
      />
    </Box>

    {/* <Box className={styles.container_section} sx={{ marginTop: '1rem' }}>
      <Typography variant='subtitle2'>If your family members have an account you can create a group</Typography>
      <Button fullWidth
        variant='outlined'
        disabled={countPerson === 0}
        onClick={handleOpen}>
        Add family member
      </Button>
    </Box> */}

    {/* {open && <AddPerson open={open} handleClose={handleClose} who='partner' addPerson={() => { }} />} */}

    <Box className={styles.button_container}>
      <Button fullWidth
        variant='outlined'
        onClick={handleBack}>
        {t`Back`}
      </Button>

      <Button fullWidth
        variant='contained'
        disabled={countPerson === 0}
        onClick={handleNext}>
        {t`Next`}
      </Button>
    </Box>
  </Box>
}
