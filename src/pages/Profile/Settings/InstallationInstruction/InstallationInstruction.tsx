import { Box, Typography } from "@mui/material"
import styles from './InstallationInstruction.module.scss'

import AddToHomeScreenStepOne from '../../../../assets/installation/safari_install.png'
import AddToHomeScreenStepTwo from '../../../../assets/installation/safari_add_to_home.png'

export const InstallationInstruction = (): JSX.Element => {
  return <Box className={styles.container}>
    <Typography variant='body1'>
      You can enter the application simply by clicking on the shortcut.
      Here's how to create one:
    </Typography>
    <ul>
      <li>At the bottom of the browser, click on the "Share" button</li>
    </ul>
    <img src={AddToHomeScreenStepOne} alt="Install Roommate application" />
    <ul>
      <li>From the list below, select "Add to Home Screen". You can rename the shortcut as you wish</li>
    </ul>
    <img src={AddToHomeScreenStepTwo} alt="Add to Home screen" />
    <ul>
      <li>
        Click "Add". The shortcut will appear on your phone's home screen. You now have quick access to the application.
      </li>
    </ul>

    <Typography variant='body1'>
      Click anywhere to close the instruction.
    </Typography>
  </Box>
}