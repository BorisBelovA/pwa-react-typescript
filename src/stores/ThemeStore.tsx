import { type PaletteMode } from '@mui/material'
import { makeAutoObservable } from 'mobx'
import { type RootStore } from './RootStore'

export class ThemeStore {
  theme: PaletteMode = 'light'

  rootStore: RootStore

  constructor (rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
  }

  setTheme = (theme: PaletteMode): void => {
    this.theme = theme
  }
}
