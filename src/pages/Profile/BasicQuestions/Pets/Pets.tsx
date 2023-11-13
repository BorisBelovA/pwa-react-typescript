import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PetButton from 'src/components/Buttons/PetButton/PetButton'
import { useActive } from 'src/components/ProgressSlider/ProgressSlider'
import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import styles from '../BasicQuestions.module.scss'
import stylesPets from './Pets.module.scss'
import { ReactComponent as CatSvg } from '../../../../assets/icons/pets/Cat.svg'
import { ReactComponent as DogSvg } from '../../../../assets/icons/pets/Dog.svg'
import { ReactComponent as FishSvg } from '../../../../assets/icons/pets/Fish.svg'
import { ReactComponent as BirdSvg } from '../../../../assets/icons/pets/Bird.svg'
import { ReactComponent as OtherSvg } from '../../../../assets/icons/pets/Other.svg'
import { type PetType, type Pet, QuestionnaireRoutes } from 'models'
import PetList from 'src/components/PetList/PetList'
import { useEffect, useMemo } from 'react'
import { t } from '@lingui/macro'

const Pets: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const { setActive } = useActive()
  const { questions, setQuestions, setPercent } = useBasicQuestions()
  const petTypes: Array<{ type: PetType, icon: React.FunctionComponent }> = [
    { type: 'cat', icon: CatSvg },
    { type: 'dog', icon: DogSvg },
    { type: 'fish', icon: FishSvg },
    { type: 'bird', icon: BirdSvg },
    { type: 'other', icon: OtherSvg }
  ]

  const pets = useMemo(() => {
    return questions.pets ?? []
  }, [questions.pets])

  useEffect(() => {
    setActive('pets')
  }, [])

  useEffect(() => {
    const count = questions.havePets !== undefined
      ? questions.havePets
        ? questions.pets?.length
          ? 100
          : 0
        : 100
      : 0

    setPercent(
      count,
      100,
      'pets'
    )
  }, [questions.havePets, questions.pets])

  const addPet = (type: PetType): void => {
    if (pets.length === 0) {
      setQuestions({ ...questions, pets: [{ type, count: 1 }] })
      return
    }
    if (pets.some((pet: Pet) => (pet.type === type))) {
      setQuestions({
        ...questions,
        pets: pets.map((pet) => ((pet.type === type && pet.count !== undefined)
          ? { ...pet, count: Number(pet.count) + 1 }
          : { ...pet }))
      })
    } else {
      setQuestions({ ...questions, pets: [...pets, { type, count: 1 }] })
    }
  }

  const deletePet = (type: string): void => {
    if (pets.some((pet: Pet) => (pet.type === type))) {
      setQuestions({
        ...questions,
        pets: pets.map(pet => pet.type === type
          ? ({ ...pet, count: pet.count - 1 })
          : ({ ...pet })
        )
      })
    }
  }

  return (
    <Box className={styles.question}>
      <Box className={styles.question__head}>
        <Typography className={styles.question__head_text} variant='h1'>{t`Do you have pets?`}</Typography>
        <ToggleButtonGroup
          size='small'
          color='primary'
          value={questions.havePets}
          exclusive
          onChange={(e, value) => {
            setQuestions({ ...questions, havePets: value })
          }}>
          <ToggleButton value={false}>{t`no`}</ToggleButton>
          <ToggleButton value={true}>{t`yes`}</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box className={styles.question__content}>
        {questions.havePets === true && (
          <><Box className={styles.question__input}>
            <Typography variant='h2'>{t`What pets?`}</Typography>
            <Box className={stylesPets.petsButtons}>{petTypes.map((pet, i) => (
              <PetButton key={i} onClick={() => { addPet(pet.type) }} icon={pet.icon} />
            ))}
            </Box>
          </Box>
            <Box className={styles.question__input}>
              {(questions.pets !== undefined && questions.pets.length > 0) && questions.pets.map((pet, i) => (
                pet.count > 0 && <PetList key={i} pet={pet} deletePet={() => { deletePet(pet.type) }} />
              ))}
            </Box>
          </>
        )}

      </Box>
      <Box className={styles.question__nav}>
        <Button variant='outlined'
          fullWidth
          onClick={() => {
            navigate(-1)
          }}>
          {t`Back`}
        </Button>
        <Button variant='contained'
          fullWidth
          onClick={() => {
            navigate(`../${QuestionnaireRoutes.SMOKING}`)
          }}>
          {t`Next`}
        </Button>
      </Box>
    </Box>
  )
}
export default Pets
