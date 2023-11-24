import { useState } from 'react'

export type Direction = 'ltr' | 'rtl'

export const DOCUMENT_DIRECTION_KEY = 'documentDirection'

export interface DocumentDirectionContext {
  direction: Direction
  setDocumentDirection: (dir: Direction) => void
}

export const useDocumentDirection = (): DocumentDirectionContext => {
  const [direction, setDirection] = useState<Direction>('ltr')

  const setDocumentDirection = (dir: Direction): void => {
    document.dir = dir
    setDirection(dir)
    localStorage.setItem(DOCUMENT_DIRECTION_KEY, dir)
  }

  return {
    direction,
    setDocumentDirection
  } as const
}
