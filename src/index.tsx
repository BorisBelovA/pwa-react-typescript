import React, { useCallback, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes/router'
import CssBaseline from '@mui/material/CssBaseline'
import { StoreProvider } from './utils/StoreProvider'
import { RootStore } from './stores/RootStore'
import { configure } from 'mobx'
import CustomThemeProvider from './styles/CustomThemeProvider'
import { type IBeforeInstallPromptEvent, PromptToInstall } from './context/promptToInstall'
import ReactGA from 'react-ga4'
import { YMInitializer } from '@appigram/react-yandex-metrika'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { messages as messagesEng } from './locales/en/messages'
import { DOCUMENT_DIRECTION_KEY, type Direction, useDocumentDirection } from './context/documentDirection'
import { DOCUMENT_LANGUAGE_KEY, useDocumentLanguage } from './context/documentLanguage'

i18n.load('en', messagesEng)
i18n.activate('en')

configure({ enforceActions: 'always' })

if (process.env.REACT_APP_HOST_TYPE === 'PROD') {
  ReactGA.initialize('G-9HTPPGN44N')
}

const App = (): JSX.Element => {
  const store = new RootStore()
  const [deferredEvt, setDeferredEvt] = useState<IBeforeInstallPromptEvent | null>(
    null
  )
  const { setDocumentDirection } = useDocumentDirection()
  const { setDocumentLanguage } = useDocumentLanguage()

  const hidePrompt = useCallback(() => {
    setDeferredEvt(null)
  }, [])

  useEffect(() => {
    const ready = (e: IBeforeInstallPromptEvent): void => {
      e.preventDefault()
      setDeferredEvt(e)
    }

    window.addEventListener('beforeinstallprompt', ready as any)

    return () => {
      window.removeEventListener('beforeinstallprompt', ready as any)
    }
  }, [])

  useEffect(() => {
    const savedDocumentDirection = localStorage.getItem(DOCUMENT_DIRECTION_KEY)
    if (savedDocumentDirection) {
      setDocumentDirection(savedDocumentDirection as Direction)
    }

    const savedDocumentLanguage = localStorage.getItem(DOCUMENT_LANGUAGE_KEY)
    if (savedDocumentLanguage) {
      void setDocumentLanguage(savedDocumentLanguage ?? 'en')
    }
  }, [])

  return <React.StrictMode>
    {process.env.REACT_APP_HOST_TYPE === 'PROD' &&
      <YMInitializer
        accounts={[95287962]}
        options={{
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true
        }}
      />
    }
    <I18nProvider i18n={i18n}>
      <BrowserRouter basename='/'>
        <StoreProvider store={store}>
          <PromptToInstall.Provider value={{ deferredEvt, hidePrompt }}>
            <CustomThemeProvider>
              <CssBaseline />
              <Router />
            </CustomThemeProvider>
          </PromptToInstall.Provider>
        </StoreProvider>
      </BrowserRouter>
    </I18nProvider>
  </React.StrictMode>
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <App></App>
)

const config = {
  onUpdate: (registration: ServiceWorkerRegistration) => {
    const w = registration.waiting
    const a = confirm('New update found. Restart your application?')
    if (a) {
      w?.postMessage({ type: 'SKIP_WAITING' })
      window.location.reload()
    }
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register(config)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
