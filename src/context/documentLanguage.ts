import { useState } from 'react'
import { i18n } from '@lingui/core'

export const DOCUMENT_LANGUAGE_KEY = 'documentLanguage'

export interface DocumentLanguageContext {
  language: string
  setDocumentLanguage: (lang: string) => void
}

export const useDocumentLanguage = (): DocumentLanguageContext => {
  const [language, setLanguage] = useState<string>('en')

  const setDocumentLanguage = (lang: string): void => {
    i18n.activate(lang)
    setLanguage(lang)
    localStorage.setItem(DOCUMENT_LANGUAGE_KEY, lang)
  }

  return {
    language,
    setDocumentLanguage
  } as const
}
