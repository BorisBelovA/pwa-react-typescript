import { createTheme, ThemeProvider } from '@mui/material/styles'
import { observer } from 'mobx-react-lite'
import { type ReactElement, useMemo } from 'react'
import { useStore } from 'src/utils/StoreProvider'
import { getTheme } from './defaultTheme'

interface Props {
  children: ReactElement | ReactElement[]
}
const CustomThemeProvider = (props: Props): JSX.Element => {
  const { themeStore } = useStore()
  const theme = useMemo(() => createTheme(getTheme(themeStore.theme)), [themeStore.theme])
  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '100%' }} className={themeStore.theme}>
        {props.children}
      </div>
    </ThemeProvider>
  )
}
export default observer(CustomThemeProvider)
