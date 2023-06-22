import { type Gender, NewUser, UserCredentials } from '../models/user'
import { makeAutoObservable } from 'mobx'
import { type RootStore } from './RootStore'

export class RegistrationStore implements UserCredentials {
  email: string = ''
  password: string = ''

  rootStore: RootStore

  constructor (rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
  }

  public setCredentials (email: string, password: string): void {
    this.email = email
    this.password = password
  }
}
