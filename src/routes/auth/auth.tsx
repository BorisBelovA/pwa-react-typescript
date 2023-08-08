import { Route } from 'react-router-dom'
import { EmailCode } from 'src/pages/Email-code/EmailCode'
import { Login } from 'src/pages/Login/Login'
import { SignUp } from 'src/pages/Sign up/Signup'
import { TermsAndConditions } from 'src/pages/TermsAndConditions/TermsAndConditions'
import * as Registration from '../../pages/Registration/Layout'

export default [
  <Route key={0} path='login' element={<Login />}></Route>,
  <Route key={1} path='signup' element={<SignUp />}></Route>,
  <Route key={2} path='terms' element={<TermsAndConditions />}></Route>,
  <Route key={3} path='registration' element={<Registration.Layout />}></Route>,
  <Route key={4} path='email-verification' element={<EmailCode />}></Route>
]
