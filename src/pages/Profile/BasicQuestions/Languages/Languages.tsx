import { Box, Button, Chip, InputAdornment, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useActive } from 'src/components/ProgressSlider/ProgressSlider'
import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import styles from '../BasicQuestions.module.scss'
import languages from '../../../../assets/data/languages.json'
import { useEffect, useMemo, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import LanguageButton from 'src/components/Buttons/LanguageButton/LanguageButton'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

const Languages: React.FunctionComponent = () => {
  const [search, setSearch] = useState<string>('')
  const [langList, setLangList] = useState(languages)
  const { setActive, setPercent } = useActive()
  const { questions, setQuestions } = useBasicQuestions()
  const navigate = useNavigate()

  useEffect(() => { setActive('languages') }, [])
  useEffect(() => {
    setLangList(languages.filter(language => language.name.toLowerCase().includes(search.toLowerCase())))
  }, [search])

  const addLanguage = (language: string): void => {
    if (!questions.languages.some(lang => lang === language)) {
      setQuestions({ ...questions, languages: [...questions.languages, language] })
    }
  }

  const removeLanguage = (language: string): void => {
    setQuestions({ ...questions, languages: questions.languages.filter((item) => (item !== language)) })
  }

  const nextBtnDisabled = useMemo(() => {
    return questions.languages.length === 0
  }, [questions.languages])

  return (
    <Box className={styles.question}>
      <Box className={styles.question__head}>
        <Typography className={styles.question__head_text} variant='h1'>What languages do you know?</Typography>
      </Box>
      <Box className={styles.question__input}>
        <TextField
          value={search}
          onChange={(e) => { setSearch(e.target.value) }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon color='primary' />
              </InputAdornment>
            )
          }}
          label='Language'
          variant='outlined'
          size='small'
        />
        <Box className={styles.question__tagLine}>
          {questions.languages.map((language, index) => (
            <Chip
              key={index}
              color='secondary'
              label={language}
              size='small'
              deleteIcon={<CancelOutlinedIcon />}
              onDelete={() => { removeLanguage(language) }}
            />
          ))}
        </Box>
      </Box>
      <Box className={styles.question__content}>
        <Box className={styles.question__content_zeroGap}>
          {langList.map((lang, index) => (
            <LanguageButton key={index} language={lang.name} native={lang.nativeName} onClick={() => { addLanguage(lang.name) }} />
          ))}
        </Box>
      </Box>
      <Box className={styles.question__nav}>
        <Button variant='text'
          fullWidth
          onClick={() => {
            setQuestions({ ...questions, languages: [] })
            setPercent(0, 1, 'languages')
            navigate('/profile/questionnaire-basic-info/about')
          }}>
          Skip
        </Button>
        <Button variant='contained'
          fullWidth
          disabled={nextBtnDisabled}
          onClick={() => {
            navigate('/profile/questionnaire-basic-info/about')
          }}>
          Next
        </Button>
      </Box>
    </Box>
  )
}
export default Languages
