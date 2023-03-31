import { useEffect, useState } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import ProgressSlider from 'src/components/ProgressSlider/ProgressSlider'
import useProgressSlider from 'src/components/ProgressSlider/useProgressSlider'
import { type WhoCouple, type WhoFamily, type WhoFriends, type Pet, type QuestionnaireBasicType } from 'src/models/questionnaireBasic'

const QuestionnaireBasic: React.FunctionComponent = () => {
  const { items, setPercent, setActive, setPercentAndGo } = useProgressSlider({
    items: [
      { text: 'who', progress: 0, to: 'who' },
      { text: 'pets', progress: 0, to: 'pets' },
      { text: 'smoking', progress: 0, to: 'smoking' },
      { text: 'languages', progress: 0, to: 'languages' },
      { text: 'about', progress: 0, to: 'about' },
      { text: 'contacts', progress: 0, to: 'contacts' },
      { text: 'apartment', progress: 0, to: 'apartment' },
      { text: 'summary', progress: 0, to: 'summary' }
    ]
  })

  const [questions, setQuestions] = useState<QuestionnaireBasicType>({
    who: undefined,
    contacts: [],
    smokingWhat: [],
    languages: [],
    apartment: undefined,
    about: ''
  })

  useEffect(() => {
    if (questions.who === 'Alone') {
      setPercent(1, 1, 'who')
    } else if (questions.who === 'Couple') {
      const isKind: number = (questions.whoContains as WhoCouple)?.kind !== undefined &&
        (questions.whoContains as WhoCouple)?.kind !== null
        ? 1
        : 0
      const isPartner: number = (questions.whoContains as WhoCouple)?.partner !== undefined ? 1 : 0
      setPercent(1 + isKind + isPartner, 3, 'who')
    } else if (questions.who === 'Friends') {
      const isCount: number = (questions.whoContains as WhoFriends)?.count !== null &&
        (questions.whoContains as WhoFriends)?.count > 0
        ? 1
        : 0
      const isFriends: number = (questions.whoContains as WhoFriends)?.people !== undefined &&
        (questions.whoContains as WhoFriends)?.people.length > 0
        ? 1
        : 0
      setPercent(1 + isCount + isFriends, 3, 'who')
    } else if (questions.who === 'Family') {
      const isKids: number = (questions.whoContains as WhoFamily)?.kids !== undefined &&
        (questions.whoContains as WhoFamily)?.kids > 0
        ? 1
        : 0
      const isAdults: number = (questions.whoContains as WhoFamily)?.adults !== undefined &&
        (questions.whoContains as WhoFamily)?.adults > 0
        ? 1
        : 0
      const isFamily: number = (questions.whoContains as WhoFamily)?.people !== undefined &&
        (questions.whoContains as WhoFamily)?.people.length > 0
        ? 1
        : 0
      setPercent(1 + isKids + isAdults + isFamily, 4, 'who')
    }
  }, [questions.who, questions.whoContains])

  useEffect(() => {
    const isHavePets: number = questions.havePets === undefined || questions.havePets === null ? 0 : 1
    const total: number = (questions.havePets === true) ? 2 : 1
    const isPets: number = questions.pets?.some((pet: Pet) => (pet.count > 0)) === true && questions.havePets === true ? 1 : 0
    setPercent(isHavePets + isPets, total, 'pets')
  }, [questions.havePets, questions.pets])

  useEffect(() => {
    const isSmoking: number = questions.smoker === undefined || questions.smoker === null ? 0 : 1
    const total: number = (questions.smoker === true) ? 2 : 1
    const isSmokingWhat: number = questions.smokingWhat?.length > 0 && questions.smoker === true ? 1 : 0
    setPercent(isSmoking + isSmokingWhat, total, 'smoking')
  }, [questions.smoker, questions.smokingWhat])

  useEffect(() => {
    questions.languages.length > 0 ? setPercent(1, 1, 'languages') : setPercent(0, 1, 'languages')
  }, [questions.languages])

  useEffect(() => {
    questions.about !== '' ? setPercent(1, 1, 'about') : setPercent(0, 1, 'about')
  }, [questions.about])

  useEffect(() => {
    questions.contacts.length > 0 ? setPercent(1, 1, 'contacts') : setPercent(0, 1, 'contacts')
  }, [questions.contacts])

  useEffect(() => {
    questions?.apartment !== undefined && questions?.apartment !== null ? setPercent(1, 1, 'apartment') : setPercent(0, 1, 'apartment')
  }, [questions.apartment])

  return (
    <>
      <ProgressSlider items={items} setActive={setActive} />
      <Outlet context={{ setActive, setPercent, questions, setQuestions, setPercentAndGo }} />
    </>
  )
}
export default QuestionnaireBasic

interface ContextType {
  questions: QuestionnaireBasicType
  setQuestions: any
}

export const useBasicQuestions = (): ContextType => {
  return useOutletContext<ContextType>()
}
