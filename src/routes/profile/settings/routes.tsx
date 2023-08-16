import { SettingsRoutes } from 'models'
import Settings from 'src/pages/Profile/Settings/Settings'
import AccountSettings from 'src/pages/Profile/Settings/AccountSettings/AccountSettings'
import { Route } from 'react-router-dom'
import ThemeSettings from 'src/pages/Profile/Settings/ThemeSettings/ThemeSettings'
import { Feedbcak } from 'src/pages/Profile/Settings/Feedback/Feedback'

export const settingsRoutes = [
  <Route key='0' path={SettingsRoutes.INDEX} element={< Settings />} />,
  <Route key='1' path={SettingsRoutes.ACCOUNT} element={< AccountSettings />} />,
  <Route key='2' path={SettingsRoutes.THEME} element={< ThemeSettings />} />,
  <Route key='3' path={SettingsRoutes.FEEDBACK} element={< Feedbcak />} />
]
