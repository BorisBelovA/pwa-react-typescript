import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'

interface Props {
  to?: string
}

const BackButton = ({ to }: Props): JSX.Element => {
  const navigate = useNavigate()
  const nav = (): void => {
    if (to) {
      navigate(to)
    } else {
      navigate(-1)
    }
  }
  return (
    <IconButton onClick={() => { nav() }} sx={{ paddingBlock: '0' }}>
      <ArrowBackIosNewRoundedIcon color='primary' fontSize='medium' />
    </IconButton>
  )
}
export default BackButton
