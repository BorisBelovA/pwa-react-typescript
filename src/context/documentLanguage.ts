import { useState } from 'react'
import { dynamicActivate } from 'src/i18n'

export const DOCUMENT_LANGUAGE_KEY = 'documentLanguage'

export interface DocumentLanguageContext {
  language: string
  setDocumentLanguage: (lang: string) => Promise<void>
}

export const useDocumentLanguage = (): DocumentLanguageContext => {
  const [language, setLanguage] = useState<string>('en')

  const setDocumentLanguage = async (lang: string): Promise<void> => {
    await dynamicActivate(lang).then()
    setLanguage(lang)
    localStorage.setItem(DOCUMENT_LANGUAGE_KEY, lang)
  }

  return {
    language,
    setDocumentLanguage
  } as const
}
