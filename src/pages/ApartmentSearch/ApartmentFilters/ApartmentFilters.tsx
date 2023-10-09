import { Box, Typography } from '@mui/material'
import BackButton from 'src/components/Buttons/BackButton/BackButton'
import styles from './ApartmentFilters.module.scss'

const ApartmentFilters = (): JSX.Element => {
  return (
    <Box>
      <Box className={styles.head}>
        <BackButton />
        <Typography variant='h1'>ApartmentFilters</Typography>
        </Box>
      </Box>
  )
}
export default ApartmentFilters
