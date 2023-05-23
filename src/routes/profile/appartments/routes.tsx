import { AppartmentsRoutes } from 'models'
import { Route } from 'react-router-dom'
import { Basic, Location } from 'src/pages/Profile/MyAppartments'
import { Description } from 'src/pages/Profile/MyAppartments/AppartmentQuestionnaire/Description/Description'
import { Photos } from 'src/pages/Profile/MyAppartments/AppartmentQuestionnaire/Photos/Photos'
import { Summary } from 'src/pages/Profile/MyAppartments/AppartmentQuestionnaire/Summary/Summary'
export default [
  <Route key='0' path={AppartmentsRoutes.BASIC} element={<Basic />} />,
  <Route key='1' path={AppartmentsRoutes.LOCATION} element={<Location />} />,
  <Route key='2' path={AppartmentsRoutes.PHOTOS} element={<Photos />} />,
  <Route key='3' path={AppartmentsRoutes.ABOUT} element={<Description />} />,
  <Route key='4' path={AppartmentsRoutes.SUMMARY} element={<Summary />} />
]
