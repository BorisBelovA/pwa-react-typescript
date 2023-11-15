import { Box } from '@mui/material'
import { ReactComponent as PetSvg } from '../../assets/icons/badges/Pet.svg'
import { ReactComponent as HouseSvg } from '../../assets/icons/badges/House.svg'
import { ReactComponent as SmokeFreeSvg } from '../../assets/icons/badges/SmokeFree.svg'
import styles from './Badge.module.scss'
import { type Badges } from 'src/models/badges'
import { t } from '@lingui/macro'

interface Props {
  type: Badges
}

const Badge = (props: Props): JSX.Element => {
  const badges = {
    pet: { icon: <PetSvg />, comment: t`Have pets` },
    house: { icon: <HouseSvg />, comment: t`Have an apartment` },
    smokeFree: { icon: <SmokeFreeSvg />, comment: t`Not a smoker` }
  }
  return (
    <Box className={ styles.badge }>{ badges[props.type].icon }</Box>
  )
}
export default Badge
