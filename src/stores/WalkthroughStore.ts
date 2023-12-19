import { makeAutoObservable } from 'mobx'
import { type RootStore } from './RootStore'

export class WalkthroughStore {
  private visible = false

  rootStore: RootStore

  constructor (rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
  }

  public startWalkthrough (): void {
    this.visible = true
  }

  public finishWalkthrough (): void {
    this.visible = false
  }

  public get walkthroughVisible (): boolean {
    return this.visible
  }
}
