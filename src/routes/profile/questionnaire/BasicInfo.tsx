import Who from 'src/pages/Profile/BasicQuestions/Who/Who'
import Pets from 'src/pages/Profile/BasicQuestions/Pets/Pets'
import Smoking from 'src/pages/Profile/BasicQuestions/Smoking/Smoking'
import Languages from 'src/pages/Profile/BasicQuestions/Languages/Languages'
import About from 'src/pages/Profile/BasicQuestions/About/About'
import Contacts from 'src/pages/Profile/BasicQuestions/Contacts/Contacts'
import Apartment from 'src/pages/Profile/BasicQuestions/Apartment/Apartment'
import { Route } from 'react-router-dom'
import Summary from 'src/pages/Profile/BasicQuestions/Summary/Summary'

export const questionnaireRoutes = [
  <Route key='0' path='who' element={<Who />} />,
  <Route key='1' path='pets' element={<Pets />} />,
  <Route key='2' path='smoking' element={<Smoking />} />,
  <Route key='3' path='languages' element={<Languages />} />,
  <Route key='4' path='about' element={<About />} />,
  <Route key='5' path='contacts' element={<Contacts />} />,
  <Route key='6' path='apartment' element={<Apartment />} />,
  <Route key='7' path='summary' element={<Summary />} />
]
