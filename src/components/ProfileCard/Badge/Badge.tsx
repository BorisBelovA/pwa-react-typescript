import { Box } from '@mui/material'
import { ReactComponent as PetSvg } from '../../../assets/icons/badges/Pet.svg'
import { ReactComponent as HouseSvg } from '../../../assets/icons/badges/House.svg'
import { ReactComponent as SmokeFreeSvg } from '../../../assets/icons/badges/SmokeFree.svg'
import styles from './Badge.module.scss'

interface Props {
  type: 'pet' | 'house' | 'smokeFree'
}

const Badge = (props: Props): JSX.Element => {
  const badges = {
    pet: { icon: <PetSvg />, comment: 'Have pets' },
    house: { icon: <HouseSvg />, comment: 'Have apartment' },
    smokeFree: { icon: <SmokeFreeSvg />, comment: 'Not a smoker' }
  }
  return (
    <Box className={ styles.badge }>{ badges[props.type].icon }</Box>
  )
}
export default Badge
