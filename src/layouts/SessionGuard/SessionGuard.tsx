import { sessionService } from 'api-services'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * This is Guard Component so we dont visit everything what is protected
 * if user is not authorised
 * @param param0
 * @returns
 */
export const SessionGuard = ({ component }: { component: JSX.Element }): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (sessionService.authToken === null) {
      const storage = localStorage.getItem('is_onboarded')
      if (storage !== null) {
        navigate('/auth/login', { relative: 'path' })
      } else {
        navigate('/auth/onboarding', { relative: 'path' })
      }
    }
  }, [location])
  return component
}
