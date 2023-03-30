import { type QuestionnaireBasicType } from 'models'
import { ReactComponent as PetsSvg } from '../../../assets/icons/personInfo/Pets.svg'
import { ReactComponent as SmokeSvg } from '../../../assets/icons/personInfo/Smoke.svg'
import { ReactComponent as HouseSvg } from '../../../assets/icons/personInfo/House.svg'
import { Box, Chip, Typography } from '@mui/material'
import styles from './Qualities.module.scss'

interface Props {
  info: QuestionnaireBasicType
}
const Qualities = (props: Props): JSX.Element => {
  const { info } = props
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
      {info.havePets !== undefined &&
        <Box className={styles.qualities__item}>
          <PetsSvg />
          <Typography variant='subtitle1'>{info.havePets ? 'Have pets' : 'Don\'t have pets'}</Typography>
        </Box>
      }
      {info.smoker !== undefined &&
        <Box className={styles.qualities__item}>
          <SmokeSvg />
          <Typography variant='subtitle1'>{info.smoker ? 'Smokes' : 'Don\'t smoke'}</Typography>
        </Box>
      }
      {info.apartment !== undefined &&
        <Box className={styles.qualities__item}>
          <HouseSvg />
          <Typography variant='subtitle1'>{info.apartment ? 'Have an apartment' : 'Don\'t have an apartment'}</Typography>
        </Box>
      }
    </Box>
  )
}
export default Qualities
