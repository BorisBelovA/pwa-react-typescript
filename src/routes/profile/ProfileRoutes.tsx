import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import AboutMe from 'src/pages/Profile/AboutMe/AboutMe'
import BasicQuestionsRoommate from 'src/pages/Profile/RoommatePreferences/BasicQuestionsRoommate/BasicQuestionsRoommate'
import RoommatePreferences from 'src/pages/Profile/RoommatePreferences/RoommatePreferences'
import { apartmentsRoutes } from './appartments/routes'
import { ProfileRoutes } from 'models'
import { settingsRoutes } from './settings/routes'
import { questionnaireRoutes } from './questionnaire/BasicInfo'
import QuestionnaireBasic from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'
import { NotFound } from 'src/pages/NotFound'

export default [
  <Route key='1' path={ProfileRoutes.ABOUT_ME} element={<AboutMe />}></Route>,
  <Route key='2' path={ProfileRoutes.MY_APARTMENT}>
    {apartmentsRoutes}
  </Route>,
  <Route key='3' path={ProfileRoutes.ROOMMATE_PREFERENCES}>
    <Route path='' element={<RoommatePreferences />} />
    <Route path='basic-questions' element={<BasicQuestionsRoommate />} />
  </Route>,
  <Route key='4' path={ProfileRoutes.SETTINGS}>
    {settingsRoutes}
  </Route>,
  <Route key='5' path={ProfileRoutes.BASIC_QUEST} element={<QuestionnaireBasic />} errorElement={<NotFound />}>
    <Route path="" element={<Navigate to="who" replace />} />
    {questionnaireRoutes}
  </Route>
]
