import { type Gender, type AuthUser } from '../models/user'
import { makeAutoObservable } from 'mobx'
import { type RootStore } from './RootStore'
import { sessionService } from 'api-services'

export class UserStore implements AuthUser {
  id: number = 0
  firstName: string = ''
  lastName: string = ''
  gender: Gender = 'M'
  birthday: Date = new Date()
  phone: string | null = null
  photo: string | null = null
  avatar: string | null = null

  rootStore: RootStore

  constructor (rootStore: RootStore) {
    const user = this.readFromLocalStorage()
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
    if (user !== null) {
      this.setUser(user)
    }
  }

  setFirstName (firstName: string): void {
    this.firstName = firstName
    this.updateStorage()
  }

  setLastName (lastName: string): void {
    this.lastName = lastName
    this.updateStorage()
  }

  setGender (gender: Gender): void {
    this.gender = gender
    this.updateStorage()
  }

  setBirthday (birthday: Date): void {
    this.birthday = birthday
    this.updateStorage()
  }

  setPhone (phone: string): void {
    this.phone = phone
    this.updateStorage()
  }

  setAvatar (name: string): void {
    this.avatar = name
    this.updateStorage()
  }

  setPhoto (name: string): void {
    this.photo = name
    this.updateStorage()
  }

  setUser (user: AuthUser): void {
    this.id = user.id
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.gender = user.gender
    this.birthday = user.birthday
    this.phone = user.phone
    this.photo = user.photo
    this.avatar = user.avatar
    this.updateStorage()
  }

  updateStorage (): void {
    this.writeToLocalStorage({
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      birthday: this.birthday,
      phone: this.phone,
      avatar: this.avatar,
      photo: this.photo
    })
  }

  writeToLocalStorage = (user: AuthUser): void => {
    localStorage.setItem('user', JSON.stringify(user))
  }

  readFromLocalStorage = (): AuthUser | null => {
    const data = localStorage.getItem('user')
    return data !== null
      ? JSON.parse(data) as AuthUser
      : null
  }

  public deleteFromStorage = (): void => {
    localStorage.removeItem('user')
    sessionService.removeFromLocalStorage()
  }

  public get user (): AuthUser {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      birthday: this.birthday,
      phone: this.phone,
      avatar: this.avatar,
      photo: this.photo
    }
  }
  
}
