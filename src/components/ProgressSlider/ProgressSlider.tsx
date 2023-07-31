import { Box } from '@mui/material'
import { useOutletContext } from 'react-router-dom'

import ProgressSliderItem, { type ProgressSliderProps } from './ProgressSliderItem/ProgressSliderItem'
import { useEffect } from 'react'

interface Props {
  items: ProgressSliderProps[]
  useLinks?: boolean
  setActive: (active: string) => void
}

interface ContextType {
  setActive: (active: string) => void
  setPercent: (percent: number, total: number, to: string) => void
  setPercentAndGo: (progress: number, total: number, to: string, active: string) => void
}

const ProgressSlider: React.FunctionComponent<Props> = (props: Props) => {
  const { items, useLinks = true, setActive } = props
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
        {items.map((item: ProgressSliderProps) => {
          return (
            <ProgressSliderItem key={item.text} useLinks={useLinks} item={item} setActive={setActive} />
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
