import { Navigate, Route } from 'react-router-dom'
import { EmailCode } from 'src/pages/Email-code/EmailCode'
import { Login } from 'src/pages/Login/Login'
import { SignUp } from 'src/pages/Sign up/Signup'
import { TermsAndConditions } from 'src/pages/TermsAndConditions/TermsAndConditions'
import * as Registration from '../../pages/Registration/Layout'
import GetCode from 'src/pages/ResetPassword/GetCode/GetCode'
import Reset from 'src/pages/ResetPassword/Reset/Reset'
import Success from 'src/pages/ResetPassword/Success/Success'

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
  </Route>
]
