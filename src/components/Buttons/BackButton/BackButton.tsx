import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'

const BackButton = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <IconButton onClick={() => { navigate(-1) }} sx={{ paddingBlock: '0' }}>
      <ArrowBackIosNewRoundedIcon color='primary' fontSize='medium' />
    </IconButton>
  )
}
export default BackButton
