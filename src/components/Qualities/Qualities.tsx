import { type QuestionnaireBasicType } from 'models'
import WineBarIcon from '@mui/icons-material/WineBar'
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined'
import SmokingRoomsOutlinedIcon from '@mui/icons-material/SmokingRoomsOutlined'
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined'
import { Box, Chip, Typography } from '@mui/material'
import styles from './Qualities.module.scss'
import { t } from '@lingui/macro'

interface Props {
  info: QuestionnaireBasicType | null
}
const Qualities = (props: Props): JSX.Element => {
  const { info } = props

  if (!info) return <></>

  return (
    <Box className={styles.qualities}>
      <Box className={styles.qualities__languages}>
        {info.languages.map((language, index) => (
          <Chip
            key={index}
            color='secondary'
            label={language}
            size='small'
          />
        ))}
      </Box>
      {info.havePets &&
        <Box className={styles.qualities__item}>
          <PetsOutlinedIcon />
          <Typography variant='subtitle1'>{
            info.havePets
              ? t`Have pets`
              : t`Don't have pets`
            }</Typography>
        </Box>
      }
      {info.smoker &&
        <Box className={styles.qualities__item}>
          <SmokingRoomsOutlinedIcon />
          <Typography variant='subtitle1'>{
            info.smoker
              ? info.smokingWhat.join(', ')
              : t`Don't smoke`
          }</Typography>
        </Box>
      }
      {info.alcohol &&
        <Box className={styles.qualities__item}>
          <WineBarIcon />
          <Typography variant='subtitle1'>{
            info.alcohol
              ? info.alcohol
              : t`Don't drink alcohol`
          }</Typography>
        </Box>
      }
      {info.apartment !== undefined &&
        <Box className={styles.qualities__item}>
          <HouseOutlinedIcon />
          <Typography variant='subtitle1'>{
            info.apartment
              ? t`Have an apartment`
              : t`Don't have an apartment`
            }</Typography>
        </Box>
      }
    </Box>
  )
}
export default Qualities
