import { Box, Button, FormControlLabel, Radio, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import styles from '../BasicQuestions.module.scss'
import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import { useEffect, useState } from 'react'
import { type GuestAttitude, QuestionnaireRoutes } from 'models'
import { useNavigate } from 'react-router-dom'
import { t } from '@lingui/macro'

export const Guests = (): JSX.Element => {
  const { questions, setQuestions, setPercent, setActive } = useBasicQuestions()
  const [displayGuests, setDisplayGuests] = useState<boolean | null>(null)
  const navigate = useNavigate()

  interface Option {
    type: GuestAttitude
    text: string
  }

  const options: Option[] = [
    { type: 'Like guests', text: t`Like guests` },
    { type: 'Sometimes', text: t`Sometimes` },
    { type: 'Prefer without guests', text: t`Prefer without guests` },
    { type: 'No guests at all', text: t`No guests at all` }
  ]

  const setGuestType = (guestType: GuestAttitude | null): void => {
    setQuestions({
      ...questions,
      guests: guestType
    })
    setPercent(100, 100, 'guests')
  }

  useEffect(() => {
    setActive('guests')
    if (questions.guests !== null) {
      setDisplayGuests(true)
    }
    if (questions.guests) {
      setPercent(100, 100, 'guests')
    }
  }, [])

  return <Box className={styles.question}>
    <Box className={styles.question__head}>
      <Typography className={styles.question__head_text}>{t`Do you like guests?`}</Typography>
      <ToggleButtonGroup size='small'
        color='primary'
        value={displayGuests}
        exclusive
        onChange={(e, value) => {
          if (value !== null) {
            setDisplayGuests(value)
            setPercent(
              value ? 0 : 100,
              100,
              'guests'
            )
          }
          if (!value) {
            setGuestType(null)
          }
        }}>
        <ToggleButton value={false}>{t`no`}</ToggleButton>
        <ToggleButton value={true}>{t`yes`}</ToggleButton>
      </ToggleButtonGroup>
    </Box>

    <Box className={styles.question__content}>
      {displayGuests &&
        <Box className={styles.question__input}>
          <Typography variant='h2'>{t`What is your attitude to guests?`}</Typography>
          <Box className={styles.question__input_zeroGap}>
            {options.map((guestType, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    value=''
                    checked={questions.guests === guestType.type}
                    onChange={(e) => { setGuestType(guestType.type) }}
                  />
                }
                label={guestType.text} />
            ))}
          </Box>
        </Box>
      }
    </Box>

    <Box className={styles.question__nav}>
      <Button variant='outlined'
        fullWidth
        onClick={() => {
          navigate(`../${QuestionnaireRoutes.ALCOHOL}`)
        }}>
        {t`Back`}
      </Button>
      <Button variant='contained'
        fullWidth
        disabled={!!displayGuests && !questions.guests}
        onClick={() => {
          navigate(`../${QuestionnaireRoutes.LOCATION}`)
        }}>
        {t`Next`}
      </Button>
    </Box>
  </Box>
}
