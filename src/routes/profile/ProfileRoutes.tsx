import React from 'react'
import { Route } from 'react-router-dom'
import AboutMe from 'src/pages/Profile/MyPreferences/AboutMe/AboutMe'
import BasicQuestions from 'src/pages/Profile/MyPreferences/BasicQuestions/BasicQuestions'
import MyPreferences from 'src/pages/Profile/MyPreferences/MyPreferences'
import BasicQuestionsRoommate from 'src/pages/Profile/RoommatePreferences/BasicQuestionsRoommate/BasicQuestionsRoommate'
import RoommatePreferences from 'src/pages/Profile/RoommatePreferences/RoommatePreferences'
import AccountSettings from 'src/pages/Profile/Settings/AccountSettings/AccountSettings'
import Settings from 'src/pages/Profile/Settings/Settings'
import ThemeSettings from 'src/pages/Profile/Settings/ThemeSettings/ThemeSettings'
import appartmentsQuestionnaireRoutes from './appartments/routes'
import { AppartmentQuestionnaire, MyAppartments } from 'src/pages/Profile/MyAppartments'

export default [
  <React.Fragment key='1'>
    <Route path='my-preferences'>
      <Route path='' element={<MyPreferences />} />
      <Route path='about-me' element={<AboutMe />} />
      <Route path='basic-questions' element={<BasicQuestions />} />
    </Route>
    <Route path='roommate-preferences'>
      <Route path='' element={<RoommatePreferences />} />
      <Route path='basic-questions' element={<BasicQuestionsRoommate />} />
    </Route>
    <Route path='settings'>
      <Route path='' element={<Settings />} />
      <Route path='account' element={<AccountSettings />} />
      <Route path='theme' element={<ThemeSettings />} />
    </Route>
    <Route path='my-appartments'>
      <Route path='' element={<MyAppartments/>} />
      <Route path='new' element={<AppartmentQuestionnaire/>}>
        {appartmentsQuestionnaireRoutes}
      </Route>
    </Route>
  </React.Fragment>
]
