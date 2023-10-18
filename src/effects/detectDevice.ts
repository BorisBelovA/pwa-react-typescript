import { useEffect, useState } from 'react'

export function useDetectDevice (): Array<'standalone' | 'pwa' | 'browser'> {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
  const navigatorStandAlone = 'standalone' in navigator && navigator.standalone
  const [type, setType] = useState<'pwa' | 'standalone' | 'browser'>('browser')
  useEffect(() => {
    if (document.referrer.startsWith('android-app://')) {
      setType('pwa')
      return
    }
    if (!!navigatorStandAlone || isStandalone) {
      setType('standalone')
      return
    }
    setType('browser')
  }, [])
  return [type]
}
