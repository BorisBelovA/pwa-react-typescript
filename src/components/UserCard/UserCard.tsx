import styles from './UserCard.module.scss'
import PersonIcon from '@mui/icons-material/Person'
import { Typography } from '@mui/material'
import { type CommonProps } from '@mui/material/OverridableComponent'

export type UserCardProps = CommonProps & {
  image: string | null | undefined
  name: string
  age?: number
  noImageComponent?: JSX.Element
  action?: JSX.Element
}

export const UserCard = ({ image, noImageComponent, name, age, action, className }: UserCardProps): JSX.Element => {
  return <div className={`${styles.userCard} ${className ?? ''}`}
    style={{ backgroundColor: Boolean(image) ? 'transparent' : '#2EAB67' }}>
    <div className={styles.userCardContent}>
      {
        typeof image === 'string'
          ? <img data-id="img" id={styles.img} alt='photo' src={image}/>
          : noImageComponent !== undefined
            ? noImageComponent
            : <PersonIcon sx={{ fontSize: 80 }}></PersonIcon>
      }
    </div>
    <div className={styles.userCardFooter}>
      <Typography variant='h1'>{name}, {age}</Typography>
      {action}
    </div>
  </div>
}
