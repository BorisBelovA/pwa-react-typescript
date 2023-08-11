import { Typography } from '@mui/material'
import styles from './CardApartment.module.scss'
import CardBase from '../CardBase/CardBase'
import { Apartment } from 'models'

interface Props {
  apartment: Apartment
}
const CardApartment = ({apartment}: Props): JSX.Element => {
  const header = (<>
    <Typography variant='h1'>Apartment</Typography>
    <Typography>text</Typography>
  </>)

  const content = (<>
    <Typography>Description</Typography>
  </>)

  return (
    <CardBase header={header} content={content} />
  )
}
export default CardApartment
