import { useEffect, useMemo, useState } from 'react'
import { Outlet, useOutletContext } from 'react-router-dom'
import ProgressSlider from 'components/ProgressSlider/ProgressSlider'
import
useProgressSlider,
{
  type ProgressSliderInsertItemFunc,
  type ProgressSliderRemoveItemFunc,
  type ProgressSliderSetActiveFunc,
  type ProgressSliderSetPercentFunc
} from 'components/ProgressSlider/useProgressSlider'
import { type QuestionnaireBasicType } from 'models/questionnaireBasic'
import { type MainLayoutContext, useMainContext } from '../Main/MainLayout'
import { useStore } from 'utils/StoreProvider'
import { observer } from 'mobx-react-lite'
import { type ProgressSliderProps } from 'components'
import { t } from '@lingui/macro'

const QuestionnaireBasic: React.FunctionComponent = observer(() => {
  const defaultItems: ProgressSliderProps[] = [
    { text: 'who', label: t`who`, progress: 0, to: 'who' },
    { text: 'pets', label: t`pets`, progress: 0, to: 'pets' },
    { text: 'smoking', label: t`smoking`, progress: 0, to: 'smoking' },
    { text: 'languages', label: t`languages`, progress: 0, to: 'languages' },
    { text: 'sleep', label: t`sleep`, progress: 0, to: 'sleep' },
    { text: 'alcohol', label: t`alcohol`, progress: 0, to: 'alcohol' },
    { text: 'guests', label: t`guests`, progress: 0, to: 'guests' },
    { text: 'location', label: t`location`, progress: 0, to: 'location' },
    { text: 'apartment', label: t`apartment`, progress: 0, to: 'apartment' },
    { text: 'about', label: t`about`, progress: 0, to: 'about' },
    { text: 'summary', label: t`summary`, progress: 0, to: 'summary' }
  ]
  useEffect(() => {
    if (questions.who) {
      defaultItems.find(i => i.to === 'who')!.progress = 100
    }

    if (!!questions.countKids || !!questions.countAdults) {
      insertItem(t`Not Alone`, t`Not Alone`, 'not-alone', 1, 100)
    }

    const count = questions.havePets !== undefined
      ? questions.havePets
        ? questions.pets?.length
          ? 100
          : 0
        : 100
      : 0
    defaultItems.find(i => i.to === 'pets')!.progress = count

    const isSmoking: number = questions.smoker === undefined || questions.smoker === null ? 0 : 1
    const isSmokingWhat: number = questions.smokingWhat?.length > 0 && questions.smoker ? 1 : 0
    if (isSmoking + isSmokingWhat > 0) {
      defaultItems.find(i => i.to === 'smoking')!.progress = 100
    }

    if (questions.languages.length > 0) {
      defaultItems.find(i => i.to === 'languages')!.progress = 100
    }

    if (questions.sleepingHabits) {
      defaultItems.find(i => i.to === 'sleep')!.progress = 100
    }

    if (questions.alcohol) {
      defaultItems.find(i => i.to === 'alcohol')!.progress = 100
    }

    if (questions.guests) {
      defaultItems.find(i => i.to === 'guests')!.progress = 100
    }

    if (questions.location.city) {
      defaultItems.find(i => i.to === 'location')!.progress = (questions.location.city ? 33 : 0) +
        (questions.location.state ? 33 : 0) +
        (questions.location.city ? 33 : 0)
    }

    defaultItems.find(i => i.to === 'about')!.progress = questionnaire.about.length > 0
      ? 100
      : 0

    if (questions.apartment !== null) {
      defaultItems.find(i => i.to === 'apartment')!.progress = 100
    }

    if (questions.who) {
      defaultItems.forEach(i => {
        i.state = 'Inactive'
      })
    }
  }, [])

  const { items, insertItem, removeItem, setPercent, setActive, setPercentAndGo } = useProgressSlider({
    items: [...defaultItems]
  })

  const { questionnaireStore } = useStore()

  const questionnaire = useMemo(() => {
    return questionnaireStore.questionnaire ?? {
      id: 0,
      who: null,
      contacts: [],
      smokingWhat: [],
      languages: [],
      apartment: null,
      countAdults: null,
      countKids: null,
      sleepingHabits: null,
      alcohol: null,
      guests: null,
      about: '',
      location: {
        country: null,
        city: null,
        state: null
      }
    }
  }, [questionnaireStore.questionnaire])

  const [questions, setQuestions] = useState<QuestionnaireBasicType>(questionnaire)

  return (
    <>
      <ProgressSlider items={items} setActive={setActive} />
      <Outlet context={{
        setActive,
        insertItem,
        removeItem,
        setPercent,
        questions,
        setQuestions,
        setPercentAndGo,
        ...useMainContext()
      }} />
    </>
  )
})

export default QuestionnaireBasic

export type BasicQuestionnaireContext = MainLayoutContext & {
  questions: QuestionnaireBasicType
  insertItem: ProgressSliderInsertItemFunc
  removeItem: ProgressSliderRemoveItemFunc
  setPercent: ProgressSliderSetPercentFunc
  setActive: ProgressSliderSetActiveFunc
  setQuestions: React.Dispatch<React.SetStateAction<QuestionnaireBasicType>>
}

export const useBasicQuestions = (): BasicQuestionnaireContext => {
  return useOutletContext<BasicQuestionnaireContext>()
}
