import { AppartmentsStore } from './Appartments'
import { ThemeStore } from './ThemeStore'
import { UserStore } from './UserStore'

export class RootStore {
  userStore: UserStore
  themeStore: ThemeStore
  appartmentStore: AppartmentsStore
  constructor () {
    this.userStore = new UserStore(this)
    this.themeStore = new ThemeStore(this)
    this.appartmentStore = new AppartmentsStore(this)
  }
}
