import { Icon, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import styles from './ListItemButton.module.scss'
import { type OverridableComponent } from '@mui/material/OverridableComponent'

export interface ListItemButtonProps {
  icon?: OverridableComponent<any>
  label: string
  action: (args: any) => any
  className?: string
}

export const MyListItemButton = ({ icon, label, action, className }: ListItemButtonProps): JSX.Element => {
  const theme = useTheme()
  return <ListItem className={styles.list_item} disablePadding onClick={action}>
    <ListItemButton className={className} sx={{ padding: '12px 0' }}>
      {icon &&
        <ListItemIcon className={styles.list_item_icon}>
          <Icon component={icon} sx={{
            fontSize: 35,
            color: theme.palette.primary.main
          }}></Icon>
        </ListItemIcon>
      }
      <ListItemText className={styles.list_item_text} primary={label} />
    </ListItemButton>
  </ListItem>
}
