import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SettingsRoutes } from 'models'
import { BottomNavigation, BottomNavigationAction, Paper, useTheme } from '@mui/material'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';

const NavBar: React.FunctionComponent = () => {
  const [locBase, setLocBase] = useState('')
  const theme = useTheme()
  const location = useLocation()
  const menu = [
    { to: '/profile', label: 'Profile', icon: <AccountCircleOutlinedIcon />, value: 'profile' },
    { to: '/apartment-search', label: 'Apartments', icon: <MapsHomeWorkOutlinedIcon />, value: 'apartment-search' },
    { to: '/search', label: 'Search', icon: <SearchOutlinedIcon />, value: 'search' },
    { to: '/match', label: 'Matches', icon: <FavoriteBorderOutlinedIcon />, value: 'match' },
    { to: SettingsRoutes.FEEDBACK, label: 'Feedback', icon: <ContactSupportOutlinedIcon />, value: SettingsRoutes.FEEDBACK }
  ]

  useEffect(() => {
    setLocBase(location.pathname.split('/')[1])
  }, [location])

  const navigate = useNavigate()

  return (
    <Paper sx={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundImage: 'none',
      borderRadius: 0,
      paddingTop: '5px'
    }}
      elevation={3}
    >
      <BottomNavigation
        sx={{ paddingBottom: '10px' }}
        showLabels
        value={locBase}
        onChange={(event, newValue) => {
          setLocBase(newValue)
          navigate(`/${newValue}`)
        }}
      >
        {menu.map((m, idx) => <BottomNavigationAction key={idx}
          sx={{
            paddingLeft: idx === 0
              ? '16px'
              : 'inherit',
            paddingRight: idx === menu.length - 1
              ? '16px'
              : 'inherit'
          }}
          label={m.label}
          icon={m.icon}
          value={m.value} />)
        }
      </BottomNavigation>
    </Paper>
  )
}

export default NavBar
