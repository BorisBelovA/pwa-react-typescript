import { type PaletteMode } from '@mui/material'
import { makeAutoObservable } from 'mobx'
import { type RootStore } from './RootStore'

export class ThemeStore {
  theme: PaletteMode = 'light'

  private storageKey = 'UI_Theme'

  rootStore: RootStore

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
    const savedTheme = this.readFromStorage()
    this.setTheme(savedTheme ?? this.detectSystemTheme())
  }

  setTheme = (theme: PaletteMode): void => {
    this.theme = theme
    this.saveThemeToStorage(theme)
  }

  public setSystemTheme = (): void => {
    this.setTheme(this.detectSystemTheme())
  }

  private readonly saveThemeToStorage = (theme: PaletteMode): void => {
    localStorage.setItem(this.storageKey, theme)
  }

  private readonly readFromStorage = (): PaletteMode | null => {
    return (localStorage.getItem(this.storageKey) as PaletteMode | null)
  }

  private readonly detectSystemTheme = (): PaletteMode => {
    if (!window.matchMedia) {
      return 'light'
    }
    const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return preferDark
      ? 'dark'
      : 'light'
  }
}
