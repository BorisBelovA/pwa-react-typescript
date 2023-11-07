import { Avatar, Card, CardContent, CardHeader, IconButton, Typography, useTheme } from '@mui/material'
import { type NewUser } from '../../../models/user'
import styles from './FifthStep.module.scss'
import { calculateAge, mapToRusFormat } from 'src/utils/date-time'
import EditIcon from '@mui/icons-material/Edit'
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg'
import { UserCard } from 'src/components/UserCard/UserCard'
import PersonIcon from '@mui/icons-material/Person'
import { type RegistrationSteps } from '../Layout'
import { t } from '@lingui/macro'

export interface FifthStepProps {
  user: NewUser
  onEditStep: (step: RegistrationSteps) => void
}

export const FifthStep = ({ user, onEditStep }: FifthStepProps): JSX.Element => {
  const theme = useTheme()

  return <div className={styles.userSummaryInfo}>
    <Typography variant='h1' >{t`Check your data`}</Typography>
    <Card>
      <CardHeader className={styles.cardHeader} avatar={
        user.avatar !== null && user.avatar !== undefined
          ? <img id={styles.userAvatar} data-id='user-avatar' src={user.avatar} alt="avatar" />
          : <Avatar><PersonIcon></PersonIcon></Avatar>
      }
        title={`${user.firstName ?? ''} ${user.lastName ?? ''}`}
        subheader={
          `${user.gender === 'M' ? t`Male` : t`Female`}, ${user.birthday ? mapToRusFormat(user.birthday) : ''}`
        }
        action={
          <IconButton sx={{ color: theme.palette.primary.main }}
            aria-label="edit"
            onClick={() => { onEditStep('personal') }}>
            <EditIcon fontSize='small' />
          </IconButton>
        }>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <div className={styles.userPhone}>
          <PermPhoneMsgIcon sx={{ color: theme.palette.secondary.main }} fontSize='small' />
          <Typography style={{ flex: 1 }} fontSize={14}>{user.phone}</Typography>
          <IconButton sx={{ color: theme.palette.primary.main }}
            aria-label="edit"
            onClick={() => { onEditStep('phone') }}>
            <EditIcon fontSize='small' />
          </IconButton>
        </div>
      </CardContent>
    </Card>

    <UserCard image={user.photo}
      name={user.firstName ?? ''}
      age={user.birthday ? calculateAge(user.birthday) : undefined}
      className={ user.photo ? '' : styles.no_image }
      action={
        <IconButton sx={{ color: theme.palette.primary.main }}
          size='small'
          aria-label="edit"
          onClick={() => { onEditStep('photo') }}>
          <EditIcon fontSize='small' />
          <Typography fontSize={14} marginLeft='0.5rem'>{t`Edit`}</Typography>
        </IconButton>
      }></UserCard>
  </div>
}
