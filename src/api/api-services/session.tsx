export class SessionService {
  constructor () {
    this._authToken = this.readFromLocalStorage()
  }

  private _authToken: string | null = null

  public get authToken (): string | null {
    return this._authToken
  }

  public set authToken (token: string | null) {
    if (token !== null) {
      this.writeToLocalStorage(token)
    }
    this._authToken = token
  }

  private readonly writeToLocalStorage = (token: string): void => {
    localStorage.setItem('sessnioToken', token)
  }

  private readonly readFromLocalStorage = (): string | null => {
    return localStorage.getItem('sessnioToken') ?? null
  }

  public readonly removeFromLocalStorage = (): void => {
    this.authToken = null
    localStorage.removeItem('sessnioToken')
  }
}
export const sessionService = new SessionService()
