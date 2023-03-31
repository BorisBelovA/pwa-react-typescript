import { type Gender, type UserForm } from '../models/user'
import { makeAutoObservable } from 'mobx'
import { type RootStore } from './RootStore'

export class UserStore implements UserForm {
  email: string = ''
  password: string = ''
  firstName: string = ''
  lastName: string = ''
  gender: Gender = 'M'
  birthday: Date = new Date()
  phone: string | null = null
  photo: string | null = null
  avatar: string | null = null

  rootStore: RootStore

  constructor (rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
  }

  setFirstName (firstName: string): void { this.firstName = firstName }
  setLastName (lastName: string): void { this.lastName = lastName }
  setGender (gender: Gender): void { this.gender = gender }
  setBirthday (birthday: Date): void { this.birthday = birthday }
  setPhone (phone: string): void { this.phone = phone }
  setEmail (email: string): void { this.email = email }
  setPassword (password: string): void { this.password = password }

  setUser (user: UserForm): void {
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.gender = user.gender
    this.birthday = user.birthday
    this.phone = user.phone
    this.photo = user.photo
    this.avatar = user.avatar
  }

  saveToLocalStorage = (): void => {

  }

  loadFromLocalStorage = (): void => {

  }
}
