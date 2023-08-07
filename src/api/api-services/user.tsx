import { type ErrorCodes } from 'src/models/errors'
import http from '../common-configuration'
import { type AuthenticatedUserData } from '../dto/api-responses'
import { type HttpResponse } from '../dto/common-interfaces'
import { type UserForm, type UserDto, type UserCredentials } from '../dto/user'

class UserApiService {
  public async createUserV2 (credentials: UserCredentials): Promise<UserDto> {
    return await http.post<HttpResponse<UserDto>>('/user', credentials)
      .then(response => {
        if (response.data.status.severityCode === 'ERROR') {
          throw new Error(response.data.status.statusCodeDescription)
        }
        return response.data.response
      })
      .catch(errorResponse => {
        console.error(errorResponse.status?.statusCodeDescription ?? errorResponse.message)
        throw new Error(errorResponse.status?.statusCodeDescription ?? errorResponse.message)
      })
  }

  public async sendCode (email: string): Promise<null> {
    return await http.post<HttpResponse<null>>('/reset', { email })
      .then(response => {
        if (response.data.status.severityCode === 'ERROR') {
          throw new Error(response.data.status.statusCodeDescription)
        }
        return response.data.response
      })
      .catch(errorResponse => {
        console.error(errorResponse.status?.statusCodeDescription ?? errorResponse.message)
        throw new Error(errorResponse.status?.statusCodeDescription ?? errorResponse.message)
      })
  }

  public async updateUser (user: UserForm, token: string): Promise<UserDto> {
    return await http.put<HttpResponse<UserDto>>('/user', user, {
      headers: {
        Authorization: token
      }
    })
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
  public async activateUser (token: string, email: string): Promise<string> {
    const emailEncoded = encodeURIComponent(email)
    return await http.get<HttpResponse<string>>(`/login/${token}?email=${emailEncoded}`)
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
          throw new Error(response.data.status.statusCodeDescription, { cause: response.data.status.statusCode as ErrorCodes })
        }
        return response.data.response
      })
      .catch(errorResponse => {
        console.error(errorResponse.response?.data?.message ?? errorResponse.message)
        if (errorResponse instanceof Error) {
          throw errorResponse
        } else {
          throw new Error(errorResponse.message ?? 'Unexpected behaviour')
        }
      })
  }

  public async getAuthenticatedUser (token: string): Promise<AuthenticatedUserData> {
    return await http.get<HttpResponse<AuthenticatedUserData>>('/user', {
      headers: {
        Authorization: token
      }
    })
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

  public async getUserByEmail (token: string, email: string): Promise<AuthenticatedUserData> {
    return await http.get<HttpResponse<AuthenticatedUserData>>(`/user?email=${email}`, {
      headers: {
        Authorization: token
      }
    })
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

  public async resetEmailToken (email: string): Promise<string> {
    return await http.post<HttpResponse<string>>('/login/reset', { email })
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

  public async deleteAccount (token: string): Promise<null> {
    return await http.delete<HttpResponse<null>>('/user', {
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        if (response.data.status.severityCode === 'ERROR') {
          throw new Error(response.data.status.statusCodeDescription)
        }
        return response.data.response
      })
      .catch(errorResponse => {
        console.error(errorResponse.response?.data?.message ?? errorResponse.message)
        if (errorResponse instanceof Error) {
          throw errorResponse
        } else {
          throw new Error(errorResponse.message ?? 'Unexpected behaviour')
        }
      })
  }
}
export const userApiService = new UserApiService()
