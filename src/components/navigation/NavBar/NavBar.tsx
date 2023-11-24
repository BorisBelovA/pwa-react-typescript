import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SettingsRoutes } from 'models'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined'
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined'

import { t } from '@lingui/macro'

const NavBar: React.FunctionComponent = () => {
  const [locBase, setLocBase] = useState('')
  const location = useLocation()
  const menu = [
    { to: '/profile', label: t`Profile`, icon: <AccountCircleOutlinedIcon />, value: 'profile' },
    { to: '/apartment-search', label: t`Apartments`, icon: <MapsHomeWorkOutlinedIcon />, value: 'apartment-search' },
    { to: '/search', label: t`Search`, icon: <SearchOutlinedIcon />, value: 'search' },
    { to: '/match', label: t`Matches`, icon: <FavoriteBorderOutlinedIcon />, value: 'match' },
    { to: SettingsRoutes.FEEDBACK, label: t`Feedback`, icon: <ContactSupportOutlinedIcon />, value: SettingsRoutes.FEEDBACK }
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
          className={idx === 0 ? 'first-button' : idx === menu.length - 1 ? 'last-button' : ''}
          label={m.label}
          icon={m.icon}
          value={m.value} />)
        }
      </BottomNavigation>
    </Paper>
  )
}

export default NavBar
