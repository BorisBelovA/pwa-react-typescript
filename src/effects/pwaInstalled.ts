import { useState, useEffect } from "react"

export function usePwaAppInstalled(): [
  boolean,
] {
  const [appInstalled, setAppInstalled] = useState<boolean>(false)

  useEffect(() => {
    const installed = () => {
      alert('app installed')
      setAppInstalled(true)
    }

    window.addEventListener('appinstalled', installed as any)

    return () => {
      window.removeEventListener('appinstalled', installed as any)
    }
  }, [])

  return [appInstalled]
}