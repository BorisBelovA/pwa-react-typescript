import { useEffect, useState } from 'react'
import { type SliderState, type ProgressSliderProps } from './ProgressSliderItem/ProgressSliderItem'

interface Props {
  items: ProgressSliderProps[]
  finished?: boolean
}

interface ReturnType {
  items: ProgressSliderProps[]
  setActive: (active: string) => void
  setPercent: (percent: number, total: number, to: string) => void
  setPercentAndGo: (progress: number, total: number, to: string, active: string) => void
  completeStep: (step: string) => void
}

const useProgressSlider = (props: Props): ReturnType => {
  const [items, setItems] = useState<ProgressSliderProps[]>(props.items)
  const [active, setActive] = useState<string>('')

  const scrollToStep = (step: string): void => {
    const element = document.getElementById(step)
    if (element !== null) { element.scrollIntoView({ inline: 'center', behavior: 'smooth' }) }
  }
  
  useEffect(() => {
    let found = false
    active !== '' && setItems(
      items.map((item) => {
        if (item.to === active) {
          item.state = 'Active'
          found = true
          // item.state === 'Active' - sets previously active step to inactive
          // item.state === 'Inactive' make sure that previously activated steps wont become disabled
          // !found sets items to the left of active to inactive
          // props.finished === true sets items to the right of active to inactive if form been completed before
        } else if (item.state === 'Active' || item.state === 'Inactive' || !found || props.finished === true) {
          item.state = 'Inactive'
        } else {
          item.state = 'Disabled'
        }
        return item
      }
      )
    )
    scrollToStep(active)
  }, [active])

  const completeStep = (step: string): void => {
    const nextItemIndex = items.findIndex(i => i.text === step) + 1
    if (nextItemIndex + 1 <= items.length) {
      const newItems: ProgressSliderProps[] = items.map((i, idx) => {
        if (i.text === step) {
          return {
            ...i,
            progress: 100,
            state: 'Inactive'
          }
        }
        if (idx === nextItemIndex) {
          return {
            ...i,
            state: 'Active'
          }
        }
        return i
      })
      setItems(newItems)
      setActive(items[nextItemIndex].to)
      scrollToStep(items[nextItemIndex].text)
    }
  }

  const setPercent = (progress: number, total: number, to: string): void => {
    setItems(
      items.map((item) =>
        item.to === to
          ? { ...item, progress: progress !== null ? 100 / total * progress : item.progress }
          : { ...item }
      )
    )
  }

  const setPercentAndGo = (progress: number, total: number, to: string, active: string): void => {
    setItems(
      items.map((item) => {
        let state: SliderState, percent
        item.to === to && progress !== null ? percent = 100 / total * progress : percent = item.progress
        item.to === active
          ? state = 'Active'
          : item.state === 'Active' || item.state === 'Inactive' ? state = 'Inactive' : state = 'Disabled'
        return { ...item, state, progress: percent }
      }
      )
    )
    const element = document.getElementById(active)
    if (element !== null) { element.scrollIntoView({ inline: 'center', behavior: 'smooth' }) }
  }
  return { items, setPercent, setActive, setPercentAndGo, completeStep } as const
}
export default useProgressSlider
