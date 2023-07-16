import { Box, Button, FormControlLabel, Radio, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import styles from '../BasicQuestions.module.scss'
import { useBasicQuestions } from "src/layouts/QuestionnaireBasic/QuestionnaireBasic"
import { useEffect, useState } from "react"
import { GuestAttitude, QuestionnaireRoutes } from "models"
import { useNavigate } from "react-router-dom"

export const Guests = (): JSX.Element => {
  const { questions, setQuestions, setPercent, setActive } = useBasicQuestions()
  const [displayGuests, setDisplayGuests] = useState<boolean | null>(null)
  const navigate = useNavigate()

  const options: GuestAttitude[] = [
    'Like guests',
    'Sometimes',
    'Prefer without guests',
    'No guests at all'
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
      <Typography className={styles.question__head_text}>Do you like guests?</Typography>
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
        <ToggleButton value={false}>no</ToggleButton>
        <ToggleButton value={true}>yes</ToggleButton>
      </ToggleButtonGroup>
    </Box>

    <Box className={styles.question__content}>
      {displayGuests &&
        <Box className={styles.question__input}>
          <Typography variant='h2'>What is your attitude to guests?</Typography>
          <Box className={styles.question__input_zeroGap}>
            {options.map((guestType, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Radio
                    value=''
                    checked={questions.guests === guestType}
                    onChange={(e) => { setGuestType(guestType) }}
                  />
                }
                label={guestType} />
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
        Back
      </Button>
      <Button variant='contained'
        fullWidth
        disabled={!!displayGuests && !questions.guests}
        onClick={() => {
          navigate(`../${QuestionnaireRoutes.LOCATION}`)
        }}>
        Next
      </Button>
    </Box>
  </Box>
}
