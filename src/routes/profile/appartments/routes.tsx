import { ApartmentsQuestionnaireRoutes, ApartmentsRoutes } from 'models'
import { Route } from 'react-router-dom'
import { ApartmentQuestionnaire, Basic, Location, MyApartments } from 'src/pages/Profile/MyAppartments'
import { Description } from 'src/pages/Profile/MyAppartments/AppartmentQuestionnaire/Description/Description'
import { Photos } from 'src/pages/Profile/MyAppartments/AppartmentQuestionnaire/Photos/Photos'
import { Summary } from 'src/pages/Profile/MyAppartments/AppartmentQuestionnaire/Summary/Summary'

export const apartmentsQuestionnaireRoutes = [
  <Route key='0' path={ApartmentsQuestionnaireRoutes.BASIC} element={<Basic />} />,
  <Route key='1' path={ApartmentsQuestionnaireRoutes.LOCATION} element={<Location />} />,
  <Route key='2' path={ApartmentsQuestionnaireRoutes.PHOTOS} element={<Photos />} />,
  <Route key='3' path={ApartmentsQuestionnaireRoutes.ABOUT} element={<Description />} />,
  <Route key='4' path={ApartmentsQuestionnaireRoutes.SUMMARY} element={<Summary />} />
]

export const apartmentsRoutes = [
  <Route key='0' path={ApartmentsRoutes.INDEX} element={<MyApartments />} />,
  <Route key='1' path={ApartmentsRoutes.NEW} element={<ApartmentQuestionnaire />}>
    {apartmentsQuestionnaireRoutes}
  </Route>,
  <Route key='2' path={ApartmentsRoutes.EDIT} element={<ApartmentQuestionnaire />}>
    {apartmentsQuestionnaireRoutes}
  </Route>
]
