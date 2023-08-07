import { Box, Button, Typography } from '@mui/material'
import styles from '../ResetPassword.module.scss'
import { ReactComponent as SuccessSVG } from '../../../assets/icons/success.svg'

const Success = (): JSX.Element => {
  const handleSubmit = async (): Promise<void> => {

  }

  return (
    <Box className={`${styles.form} ${styles.center}`}>
      <SuccessSVG />
      <Box className={`${styles.form__head} ${styles.center}`}>
        <Typography variant='h1'>Success!</Typography>
        <Typography>Now you can log in with your new password</Typography>
      </Box>
      <Box className={`${styles.form__input}`}>
        <Button
          onClick={() => { void handleSubmit() }}
          variant="contained"
        >
          Log in
        </Button>
      </Box>
    </Box>
  )
}
export default Success
