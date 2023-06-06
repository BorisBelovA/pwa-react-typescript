import { AppartmentsQuestionnaireRoutes, AppartmentsRoutes } from 'models'
import { Route } from 'react-router-dom'
import { AppartmentQuestionnaire, Basic, Location, MyAppartments } from 'src/pages/Profile/MyAppartments'
import { Description } from 'src/pages/Profile/MyAppartments/AppartmentQuestionnaire/Description/Description'
import { Photos } from 'src/pages/Profile/MyAppartments/AppartmentQuestionnaire/Photos/Photos'
import { Summary } from 'src/pages/Profile/MyAppartments/AppartmentQuestionnaire/Summary/Summary'

export const appartmentsQuestionnaireRoutes = [
  <Route key='0' path={AppartmentsQuestionnaireRoutes.BASIC} element={<Basic />} />,
  <Route key='1' path={AppartmentsQuestionnaireRoutes.LOCATION} element={<Location />} />,
  <Route key='2' path={AppartmentsQuestionnaireRoutes.PHOTOS} element={<Photos />} />,
  <Route key='3' path={AppartmentsQuestionnaireRoutes.ABOUT} element={<Description />} />,
  <Route key='4' path={AppartmentsQuestionnaireRoutes.SUMMARY} element={<Summary />} />
]

export const appartmentsRoutes = [
  <Route key='0' path={AppartmentsRoutes.INDEX} element={<MyAppartments />} />,
  <Route key='1' path={AppartmentsRoutes.NEW} element={<AppartmentQuestionnaire />}>
    {appartmentsQuestionnaireRoutes}
  </Route>
]
