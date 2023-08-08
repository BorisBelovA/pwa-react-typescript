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
      navigate('/auth', { relative: 'path' })
    }
  }, [location])
  return component
}
