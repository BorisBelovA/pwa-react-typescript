import { Box, LinearProgress, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import styles from '../../../styles/utility.module.scss'
import { type MessageDescriptor } from '@lingui/core'
import { useLingui } from '@lingui/react'

export type SliderState = 'Active' | 'Disabled' | 'Inactive'

export interface ProgressSliderProps {
  text: string
  label: MessageDescriptor
  progress: number
  of?: number
  state?: SliderState
  to: string
}

interface ProgressSliderItemProps {
  item: ProgressSliderProps
  useLinks: boolean
  setActive: (active: string) => void
}

const ProgressSliderItem = ({ item, useLinks, setActive }: ProgressSliderItemProps): JSX.Element => {
  const theme = useTheme()
  const { i18n } = useLingui()
  const children = <Box sx={{
    opacity: `${item.state !== 'Active' ? '50%' : '100%'}`,
    textAlign: 'center',
    paddingBottom: '1.5rem'
  }}>
    <Typography
      variant={`${item.state !== 'Active' ? 'subtitle1' : 'body1'}`}
      sx={{
        paddingX: '1rem',
        paddingBottom: '.125rem',
        fontWeight: item.state !== 'Active' ? '300' : '600',
        color: item.state === undefined || item.state === 'Disabled' ? theme.palette.text.disabled : theme.palette.primary.main
      }}>
      {i18n._(item.label)}
    </Typography>
    <LinearProgress
      variant='determinate'
      sx={{
        borderRadius: 2,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: item.state === undefined || item.state === 'Disabled' ? theme.palette.text.disabled : theme.palette.primary.main,
        borderStyle: 'solid'
      }} value={item.progress}
    />
  </Box>
  return (
    useLinks
      ? <Link
        to={item.state === undefined || item.state === 'Disabled' ? '#' : item.to}
        className={styles.routerLink__reset}
        id={item.to}
      >
        {children}
      </Link>
      : <div onClick={() => { item.state !== 'Disabled' && setActive(item.to) }}
        className={styles.routerLink__reset}
        id={item.to}>
        {children}
      </div>
  )
}
export default ProgressSliderItem
