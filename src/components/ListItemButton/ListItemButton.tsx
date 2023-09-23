import { Icon, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import styles from './ListItemButton.module.scss'
import { type OverridableComponent } from '@mui/material/OverridableComponent'

export interface ListItemButtonProps {
  icon?: OverridableComponent<any>
  label: string
  action: (args: any) => any
}

export const MyListItemButton = ({ icon, label, action }: ListItemButtonProps): JSX.Element => {
  const theme = useTheme()
  return <ListItem disablePadding onClick={action}>
    <ListItemButton sx={{ padding: '12px 0' }}>
      {icon &&
        <ListItemIcon>
          <Icon component={icon} className={styles.list_button_icon} sx={{
            fontSize: 35,
            color: theme.palette.primary.main
          }}></Icon>
        </ListItemIcon>
      }
      <ListItemText primary={label} />
    </ListItemButton>
  </ListItem>
}