import { Navigate, Route, Routes } from 'react-router-dom'
import ApartmentSearch from '../pages/ApartmentSearch/ApartmentSearch'
import Matches from '../pages/Matches/Matches'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import MainLayout from '../layouts/Main/MainLayout'
import { NotFound } from '../pages/NotFound'
import ProfileRoutes from './profile/ProfileRoutes'
import AuthRoutes from './auth/auth'
import { AuthLayout } from 'src/layouts/Auth/AuthLayout'
import { SessionGuard } from 'src/layouts/SessionGuard/SessionGuard'
import { Chat } from 'src/pages/Chat/Chat'
import { IntroPage } from 'src/pages/Intro/IntroPage'
import { PathSelection } from 'src/pages/Intro/PathSelection/PathSelection'
import { SettingsRoutes } from 'models'
import { Feedback } from 'src/pages/Profile/Settings/Feedback/Feedback'

const Router: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<SessionGuard component={<MainLayout />}/>} errorElement={<NotFound />} >
        <Route path="profile">
          <Route path='' element={<Profile />} />
          {ProfileRoutes}
        </Route>
        <Route path="apartment-search" element={<ApartmentSearch />} />
        <Route path="search" element={<Search />} />
        <Route path="search/:id" element={<Search />} />
        <Route path="match" element={<Matches />} />
        {/* <Route path="notifications" element={<Notifications />} /> */}
        <Route key='3' path={SettingsRoutes.FEEDBACK} element={< Feedback />} />
        <Route path="chat" element={<Chat />} />
        <Route path="intro" element={<IntroPage />}>
          <Route path="path" element={<PathSelection />}/>
        </Route>
        <Route path="/" element={<Navigate to="search" replace />} />
        <Route path="/*" element={<Navigate to="profile" replace />} />
      </Route>

      <Route path="/auth" element={<AuthLayout/>} errorElement={<NotFound/>}>
        {AuthRoutes}
        <Route path="/auth" element={<Navigate to="login" replace />} />
        <Route path="/auth/*" element={<Navigate to="login" replace />} />
      </Route>
    </Routes>
  )
}

export default Router
