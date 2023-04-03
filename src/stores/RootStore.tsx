import { ThemeStore } from './ThemeStore'
import { UserStore } from './UserStore'

export class RootStore {
  userStore: UserStore
  themeStore: ThemeStore
  constructor () {
    this.userStore = new UserStore(this)
    this.themeStore = new ThemeStore(this)
  }
}
