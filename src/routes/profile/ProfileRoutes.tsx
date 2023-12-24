import { Navigate, Route } from 'react-router-dom'
import AboutMe from 'pages/Profile/AboutMe/AboutMe'
import BasicQuestionsRoommate from 'pages/Profile/RoommatePreferences/BasicQuestionsRoommate/BasicQuestionsRoommate'
import RoommatePreferences from 'pages/Profile/RoommatePreferences/RoommatePreferences'
import { apartmentsRoutes } from './appartments/routes'
import { ProfileRoutes } from 'models'
import { settingsRoutes } from './settings/routes'
import { questionnaireRoutes } from './questionnaire/BasicInfo'
import QuestionnaireBasic from 'layouts/QuestionnaireBasic/QuestionnaireBasic'
import { NotFound } from 'pages/NotFound'
import BasicInfo from 'pages/Profile/AboutMe/BasicInfo/BasicInfo'
import Preview from 'pages/Profile/AboutMe/Preview/Preview'
import { Subscription } from 'pages/Profile/Subscription/Subscription'

export default [
  <Route key='1' path={ProfileRoutes.ABOUT_ME}>
    <Route path='' element={<AboutMe />} />
    <Route path={ProfileRoutes.BASIC_INFO} element={<BasicInfo />} />
    <Route path={ProfileRoutes.PREVIEW} element={<Preview />} />
  </Route>,
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
  </Route>,
  <Route key='6' path={ProfileRoutes.SUBSCRIPTION} element={<Subscription />} />
]
