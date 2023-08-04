import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'

const BackButton = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <IconButton onClick={() => { navigate(-1) }}>
      <ArrowBackIosNewRoundedIcon color='primary' fontSize='medium'/>
    </IconButton>
  )
}
export default BackButton
