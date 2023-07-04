import { useEffect, useState } from 'react'
import { type SliderState, type ProgressSliderProps } from './ProgressSliderItem/ProgressSliderItem'

interface Props {
  items: ProgressSliderProps[]
  finished?: boolean
}

export type ProgressSliderInsertItemFunc = (text: string, to: string, index: number, progress?: number) => void

export type ProgressSliderRemoveItemFunc = (text: string) => void

export type ProgressSliderSetActiveFunc = (active: string) => void

export type ProgressSliderSetPercentFunc = (percent: number, total: number, to: string) => void

export type ProgressSliderSetPercentAndGoFunc = (progress: number, total: number, to: string, active: string) => void

export type ProgressSliderCompleteStepFunc = (step: string) => void

interface ReturnType {
  items: ProgressSliderProps[]
  insertItem: ProgressSliderInsertItemFunc
  removeItem: ProgressSliderRemoveItemFunc
  setActive: ProgressSliderSetActiveFunc
  setPercent: ProgressSliderSetPercentFunc
  setPercentAndGo: ProgressSliderSetPercentAndGoFunc
  completeStep: ProgressSliderCompleteStepFunc
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

  const completeStep: ProgressSliderCompleteStepFunc = (step: string): void => {
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

  const setPercent: ProgressSliderSetPercentFunc = (progress: number, total: number, to: string): void => {
    const i = items.map((item) =>
      item.to === to
        ? { ...item, progress: progress !== null ? 100 / total * progress : item.progress }
        : { ...item }
    )
    setItems(
      i
    )
  }

  const setPercentAndGo: ProgressSliderSetPercentAndGoFunc = (progress: number, total: number, to: string, active: string): void => {
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

  const insertItem: ProgressSliderInsertItemFunc = (text: string, to: string, index: number, progress?: number): void => {
    if (items.find(i => i.text === text)) {
      return
    }
    setItems([
      ...items.slice(0, index),
      { text, to, progress: progress ?? 0, state: 'Inactive' },
      ...items.slice(index)
    ])
  }

  const removeItem: ProgressSliderRemoveItemFunc = (text: string): void => {
    setItems(items.filter(i => i.text !== text))
  }
  return { items, insertItem, removeItem, setPercent, setActive, setPercentAndGo, completeStep } as const
}
export default useProgressSlider
