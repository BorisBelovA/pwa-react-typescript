import { Box, IconButton, SvgIcon } from '@mui/material'
import { ReactComponent as CatSvg } from '../../../assets/icons/pets/Cat.svg'
import styles from './Badge.module.scss'

interface Props {
  type: 'pet' | 'house'
}

const Badge = (props: Props): JSX.Element => {
  const badges = {
    pet: {icon: <CatSvg />, comment: 'Have pets'},
    house: {icon: <CatSvg />, comment: 'Have apartment'},
  }
  return (
    <Box className={styles.badge}>{badges[props.type].icon}</Box>
  )
}
export default Badge
