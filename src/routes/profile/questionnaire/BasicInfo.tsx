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
import { QuestionnaireRoutes } from 'models'

export const questionnaireRoutes = [
  <Route key='0' path={QuestionnaireRoutes.WHO} element={<WhoSearching />} />,
  <Route key='1' path={QuestionnaireRoutes.NOT_ALONE} element={<NotAlone />} />,
  <Route key='2' path={QuestionnaireRoutes.PETS} element={<Pets />} />,
  <Route key='3' path={QuestionnaireRoutes.SMOKING} element={<Smoking />} />,
  <Route key='4' path={QuestionnaireRoutes.LANGUAGES} element={<Languages />} />,
  <Route key='5' path={QuestionnaireRoutes.SLEEP} element={<SleepingHabbits />} />,
  <Route key='6' path={QuestionnaireRoutes.ALCOHOL} element={<Alcohol />} />,
  <Route key='7' path={QuestionnaireRoutes.GUESTS} element={<Guests />} />,
  <Route key='8' path={QuestionnaireRoutes.LOCATION} element={<Location />} />,
  <Route key='9' path={QuestionnaireRoutes.APARTMENT} element={<Apartment />} />,
  <Route key='10' path={QuestionnaireRoutes.ABOUT} element={<About />} />,
  <Route key='11' path={QuestionnaireRoutes.SUMMARY} element={<Summary />} />
]
