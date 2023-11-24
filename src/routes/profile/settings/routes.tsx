import { SettingsRoutes } from 'models'
import Settings from 'pages/Profile/Settings/Settings'
import AccountSettings from 'pages/Profile/Settings/AccountSettings/AccountSettings'
import { Route } from 'react-router-dom'
import ThemeSettings from 'pages/Profile/Settings/ThemeSettings/ThemeSettings'

export const settingsRoutes = [
  <Route key='0' path={SettingsRoutes.INDEX} element={< Settings />} />,
  <Route key='1' path={SettingsRoutes.ACCOUNT} element={< AccountSettings />} />,
  <Route key='2' path={SettingsRoutes.THEME} element={< ThemeSettings />} />
]
