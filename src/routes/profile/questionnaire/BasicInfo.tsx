import Pets from 'src/pages/Profile/BasicQuestions/Pets/Pets'
import Smoking from 'src/pages/Profile/BasicQuestions/Smoking/Smoking'
import Languages from 'src/pages/Profile/BasicQuestions/Languages/Languages'
import About from 'src/pages/Profile/BasicQuestions/About/About'
import Apartment from 'src/pages/Profile/BasicQuestions/Apartment/Apartment'
import { Route } from 'react-router-dom'
import Summary from 'src/pages/Profile/BasicQuestions/Summary/Summary'
import { WhoSearching } from 'src/pages/Profile/BasicQuestions/WhoSearching/WhoSearching'
import { NotAlone } from 'src/pages/Profile/BasicQuestions/NotAlone/NotAlone'
import { SleepingHabbits } from 'src/pages/Profile/BasicQuestions/SleepingHabbits/SleepingHabbits'
import { Alcohol } from 'src/pages/Profile/BasicQuestions/Alchohol/Alcohol'
import { Guests } from 'src/pages/Profile/BasicQuestions/Guests/Guests'
import { Location } from 'src/pages/Profile/BasicQuestions/Location/Location'

export const questionnaireRoutes = [
  <Route key='0' path='who' element={<WhoSearching />} />,
  <Route key='1' path='not-alone' element={<NotAlone />} />,
  <Route key='2' path='pets' element={<Pets />} />,
  <Route key='3' path='smoking' element={<Smoking />} />,
  <Route key='4' path='languages' element={<Languages />} />,
  <Route key='5' path='sleep' element={<SleepingHabbits />} />,
  <Route key='6' path='alcohol' element={<Alcohol />} />,
  <Route key='7' path='guests' element={<Guests />} />,
  <Route key='8' path='location' element={<Location />} />,
  <Route key='9' path='about' element={<About />} />,
  <Route key='10' path='apartment' element={<Apartment />} />,
  <Route key='11' path='summary' element={<Summary />} />
]
