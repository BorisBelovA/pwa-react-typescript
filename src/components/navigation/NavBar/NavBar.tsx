import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SettingsRoutes } from 'models'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined'
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined'

const NavBar: React.FunctionComponent = () => {
  const [locBase, setLocBase] = useState('')
  const location = useLocation()
  const menu = [
    { to: '/profile', label: 'Profile', icon: <AccountCircleOutlinedIcon />, value: 'profile' },
    { to: '/apartment-search', label: 'Apartments', icon: <OtherHousesOutlinedIcon />, value: 'apartment-search' },
    { to: '/search', label: 'Search', icon: <SearchOutlinedIcon />, value: 'search' },
    { to: '/match', label: 'Matches', icon: <FavoriteBorderOutlinedIcon />, value: 'match' },
    { to: SettingsRoutes.FEEDBACK, label: 'Feedback', icon: <ContactSupportOutlinedIcon />, value: SettingsRoutes.FEEDBACK }
  ]

  useEffect(() => {
    setLocBase(location.pathname.split('/')[1])
  }, [location])

  const navigate = useNavigate()

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={locBase}
        onChange={(event, newValue) => {
          setLocBase(newValue)
          navigate(`/${newValue}`)
        }}
      >
        {menu.map((m, idx) => <BottomNavigationAction key={idx}
          label={m.label}
          icon={m.icon}
          value={m.value} />)
        }
      </BottomNavigation>
    </Paper>
  )
}

export default NavBar
