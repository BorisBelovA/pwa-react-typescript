import { Box } from '@mui/material'
import { useOutletContext } from 'react-router-dom'

import ProgressSliderItem, { type ProgressSliderProps } from './ProgressSliderItem/ProgressSliderItem'

interface Props {
  items: ProgressSliderProps[]
  setActive: (active: string) => void
}

interface ContextType {
  setActive: (active: string) => void
  setPercent: (percent: number, total: number, to: string) => void
  setPercentAndGo: (progress: number, total: number, to: string, active: string) => void
}

const ProgressSlider: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <Box>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 1fr)',
        gridAutoFlow: 'column',
        alignItems: 'end',
        whiteSpace: 'nowrap',
        gap: '.5rem',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        marginX: '-1rem',
        paddingX: '1rem',
        flex: '1'
      }}>
        {props.items.map((item: ProgressSliderProps) => {
          return (
            <ProgressSliderItem key={item.text} item={item} setActive={props.setActive} />
          )
        })}
      </Box>
    </Box>
  )
}
export default ProgressSlider

export const useActive = (): ContextType => {
  return useOutletContext<ContextType>()
}
