import { Typography } from "@mui/material"
import { ReactNode } from "react"
import { Link } from "react-router-dom"
import styles from './SettingsNavigationButton.module.scss'

interface Props {
  to: string
  children: ReactNode
}

const SettingsNavigationButton = (props: Props): JSX.Element => {
  return (
    <Link to={props.to} className={styles.settingsNavButton}>
      <Typography>{props.children}</Typography>
    </Link>
  )
}
export default SettingsNavigationButton
