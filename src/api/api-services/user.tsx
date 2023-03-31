import http from '../common-configuration'
import { type HttpResponse } from '../dto/common-interfaces'
import { type UserInfo, type UserDto } from '../dto/user'

/**
 *    Debug User
 *
 *    "email": "user_1@mail.ru",
 *    "password": "qwerty1234"
 */

class UserApiService {
  /**
   * User's registration
   * @param user form with users data
   */
  public async createUser (user: UserInfo): Promise<UserDto> {
    const payload = {
      ...user,
      role: 'USER_ROLE'
    }

    return await http.post<HttpResponse<UserDto>>('/user', payload)
      .then(response => {
        if (response.data.status.severityCode === 'ERROR') {
          throw new Error(response.data.status.statusCodeDescription)
        }
        return response.data.response
      })
      .catch(errorResponse => {
        console.error(errorResponse.response?.data?.message ?? errorResponse.message)
        throw new Error(errorResponse.response?.data?.message ?? errorResponse.message)
      })
  }

  /**
   * Activate users account after registration  
   * Rught now it's in manual mode
   * @param token 
   * @returns 
   */
  public async activateUser (token: string): Promise<string> {
    return await http.get<HttpResponse<string>>(`/login/${token}`)
      .then(response => {
        if (response.data.status.severityCode === 'ERROR') {
          throw new Error(response.data.status.statusCodeDescription)
        }
        return response.data.response
      })
      .catch(errorResponse => {
        console.error(errorResponse.response?.data?.message ?? errorResponse.message)
        throw new Error(errorResponse.response?.data?.message ?? errorResponse.message)
      })
  }

  /**
   * Returns users session token
   * @param email 
   * @param password 
   * @returns 
   */
  public async login (email: string, password: string): Promise<string> {
    return await http.post<HttpResponse<string>>('/login', { email, password })
      .then(response => {
        if (response.data.status.severityCode === 'ERROR') {
          throw new Error(response.data.status.statusCodeDescription)
        }
        console.log(response)
        return response.data.response
      })
      .catch(errorResponse => {
        console.error(errorResponse.response?.data?.message ?? errorResponse.message)
        throw new Error(errorResponse.response?.data?.message ?? errorResponse.message)
      })
  }
}
export const userApiService = new UserApiService()
