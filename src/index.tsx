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

configure({ enforceActions: 'always' })

const App = (): JSX.Element => {
  const store = new RootStore()
  const [deferredEvt, setDeferredEvt] = useState<IBeforeInstallPromptEvent | null>(
    null
  )

  const hidePrompt = useCallback(() => {
    setDeferredEvt(null);
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

  return <React.StrictMode>
    <BrowserRouter basename="/">
      <StoreProvider store={store}>
        <PromptToInstall.Provider value={{deferredEvt, hidePrompt}}> 
          <CustomThemeProvider>
            <CssBaseline />
              <Router />
          </CustomThemeProvider>
        </PromptToInstall.Provider>
      </StoreProvider>
    </BrowserRouter>
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
