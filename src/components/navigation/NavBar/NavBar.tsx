import { useEffect, useState } from 'react'
import styles from './NavBar.module.scss'
import NavButton from '../NavButton/NavButton'
import { ReactComponent as ProfileSvg } from '../../../assets/nav-bar/Profile.svg'
import { ReactComponent as HouseholdSvg } from '../../../assets/nav-bar/Household.svg'
import { ReactComponent as SearchSvg } from '../../../assets/nav-bar/search.svg'
import { ReactComponent as MatchSvg } from '../../../assets/nav-bar/Match.svg'
import { ReactComponent as SupportSvg } from '../../../assets/nav-bar/Support.svg'
import { useLocation } from 'react-router-dom'

const NavBar: React.FunctionComponent = () => {
  const [locBase, setLocBase] = useState('')
  const location = useLocation()
  const menu = [
    { to: '/profile', icon: ProfileSvg, abbr: 'profi' },
    { to: '/household', icon: HouseholdSvg, abbr: 'house' },
    { to: '/search', icon: SearchSvg, abbr: 'searc' },
    { to: '/match', icon: MatchSvg, abbr: 'match' },
    { to: '/notifications', icon: SupportSvg, abbr: 'notif' }
  ]

  useEffect(() => {
    setLocBase(location.pathname.slice(1, 6))
  }, [location])

  return (
    <div className={styles.navbar}>
      <nav className={styles.navbar__navbox}>
        {menu.map((menu, i) => (
          <NavButton key={i} to={menu.to} icon={menu.icon} active={locBase === menu.abbr} />
        ))
        }

      </nav>
    </div>
  )
}

export default NavBar
