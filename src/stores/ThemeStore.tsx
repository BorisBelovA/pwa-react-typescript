import { PaletteMode } from "@mui/material"
import { makeAutoObservable } from "mobx"
import { RootStore } from "./RootStore"

export class ThemeStore {
  theme: PaletteMode = 'light'
  
  rootStore: RootStore

  constructor (rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
  }

  setTheme = (theme: PaletteMode) => {
    this.theme = theme
  }
}