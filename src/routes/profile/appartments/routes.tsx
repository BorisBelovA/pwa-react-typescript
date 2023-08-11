import { ApartmentsQuestionnaireRoutes, ApartmentsRoutes } from 'models'
import { Route } from 'react-router-dom'
import { ApartmentQuestionnaire, Basic, Location, MyApartments } from 'src/pages/Profile/MyAppartments'
import { Description } from 'src/pages/Profile/MyAppartments/AppartmentQuestionnaire/Description/Description'
import { Photos } from 'src/pages/Profile/MyAppartments/AppartmentQuestionnaire/Photos/Photos'
import { Purpose } from 'src/pages/Profile/MyAppartments/AppartmentQuestionnaire/Purpose/Purpose'
import { Summary } from 'src/pages/Profile/MyAppartments/AppartmentQuestionnaire/Summary/Summary'
import PreviewAppartment from 'src/pages/Profile/MyAppartments/PreviewAppartment/PreviewAppartment'

export const apartmentsQuestionnaireRoutes = [
  <Route key='0' path={ApartmentsQuestionnaireRoutes.BASIC} element={<Basic />} />,
  <Route key='1' path={ApartmentsQuestionnaireRoutes.LOCATION} element={<Location />} />,
  <Route key='2' path={ApartmentsQuestionnaireRoutes.PHOTOS} element={<Photos />} />,
  <Route key='3' path={ApartmentsQuestionnaireRoutes.ABOUT} element={<Description />} />,
  <Route key='4' path={ApartmentsQuestionnaireRoutes.SUMMARY} element={<Summary />} />,
  <Route key='5' path={ApartmentsQuestionnaireRoutes.PURPOSE} element={<Purpose />} />
]

export const apartmentsRoutes = [
  <Route key='0' path={ApartmentsRoutes.INDEX} element={<MyApartments />} />,
  <Route key='1' path={ApartmentsRoutes.NEW} element={<ApartmentQuestionnaire />}>
    {apartmentsQuestionnaireRoutes}
  </Route>,
  <Route key='2' path={ApartmentsRoutes.EDIT} element={<ApartmentQuestionnaire />}>
    {apartmentsQuestionnaireRoutes}
  </Route>,
  <Route key='3' path={`${ApartmentsRoutes.PREVIEW}`} element={<PreviewAppartment />} />,
  <Route key='4' path={`${ApartmentsRoutes.PREVIEW}/:id`} element={<PreviewAppartment />} />
]
