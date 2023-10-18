import { Navigate, Route, Routes } from 'react-router-dom'
import ApartmentSearch from '../pages/ApartmentSearch/ApartmentSearch'
import Matches from '../pages/Matches/Matches'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import MainLayout from '../layouts/Main/MainLayout'
import { NotFound } from '../pages/NotFound'
import ProfileRoutes from './profile/ProfileRoutes'
import AuthRoutes from './auth/auth'
import { AuthLayout } from 'layouts/Auth/AuthLayout'
import { SessionGuard } from 'layouts/SessionGuard/SessionGuard'
import { Chat } from 'pages/Chat/Chat'
import { IntroPage } from 'pages/Intro/IntroPage'
import { PathSelection } from 'pages/Intro/PathSelection/PathSelection'
import { SettingsRoutes } from 'models'
import { Feedback } from 'pages/Profile/Settings/Feedback/Feedback'
import ApartmentFilters from 'pages/ApartmentSearch/ApartmentFilters/ApartmentFilters'
import Apartment from 'pages/ApartmentSearch/Apartment/Apartment'

const Router: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<SessionGuard component={<MainLayout />}/>} errorElement={<NotFound />} >
        <Route path="profile">
          <Route path='' element={<Profile />} />
          {ProfileRoutes}
        </Route>
        <Route path="apartment-search">
          <Route path='' element={<ApartmentSearch />} />
          <Route path='filters' element={<ApartmentFilters />} />
          <Route path='apartment/:id' element={<Apartment />} />
        </Route>
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
