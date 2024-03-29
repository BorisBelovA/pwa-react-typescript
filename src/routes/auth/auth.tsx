import { Navigate, Route } from 'react-router-dom'
import { EmailCode } from 'pages/Email-code/EmailCode'
import { Login } from 'pages/Login/Login'
import { SignUp } from 'pages/Sign up/Signup'
import { TermsAndConditions } from 'pages/TermsAndConditions/TermsAndConditions'
import * as Registration from '../../pages/Registration/Layout'
import GetCode from 'pages/ResetPassword/GetCode/GetCode'
import Reset from 'pages/ResetPassword/Reset/Reset'
import Success from 'pages/ResetPassword/Success/Success'
import Onboarding from 'pages/Onboarding/Onboarding'

export default [
  <Route key={0} path='login' element={<Login />}></Route>,
  <Route key={1} path='signup' element={<SignUp />}></Route>,
  <Route key={2} path='terms' element={<TermsAndConditions />}></Route>,
  <Route key={3} path='registration' element={<Registration.Layout />}></Route>,
  <Route key={4} path='email-verification' element={<EmailCode />}></Route>,
  <Route key={5} path='reset-password'>
    <Route path='' element={<Navigate to="get-code" replace />} />
    <Route path='get-code' element={<GetCode />} />
    <Route path='reset' element={<Reset />} />
    <Route path='success' element={<Success />} />
    <Route path='*' element={<Navigate to="get-code" replace />} />
  </Route>,
  <Route key={6} path='onboarding' element={<Onboarding />}></Route>
]
