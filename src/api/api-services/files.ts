import http from '../common-configuration'
import { type HttpResponse } from '../dto/common-interfaces'
import { type SessionService, sessionService } from './session'

class FilesApiService {
  private readonly sessionService!: SessionService

  constructor (sessionService: SessionService) {
    this.sessionService = sessionService
  }

  public async uploadFile (file: File, type: 'avatar' | 'photo' | 'apartment'): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)
    /**
     * Ребята сказали, что этот сервис тоже будет наинаться с api/v1
     * так что потом это безобразие убереться
     */
    return await http.post<HttpResponse<{
      key: string
    }>>(
      `/file/upload/${type}`,
      formData,
      {
        headers: {
          Authorization: this.sessionService.authToken,
          'Content-Type': 'multipart/form-data'
        }
      }
    )
      .then(response => {
        if (response.data.status.severityCode === 'ERROR') {
          throw new Error(response.data.status.statusCodeDescription)
        }
        return response.data.response.key
      })
      .catch(errorResponse => {
        console.error(errorResponse.response?.data?.message ?? errorResponse.message)
        throw new Error(errorResponse.response?.data?.message ?? errorResponse.message)
      })
  }

  public async getFile (name: string): Promise<string> {
    return await http.get<HttpResponse<string>>('file/download', {
      headers: {
        Authorization: this.sessionService.authToken
        // 'Content-Type': 'image/png'
      },
      params: {
        path: name
      }
    })
      .then(response => {
        // if (response.data.status.severityCode === 'ERROR') {
        //   throw new Error(response.data.status.statusCodeDescription)
        // }
        return response.data as unknown as string
      })
      .catch(errorResponse => {
        console.error(errorResponse.response?.data?.message ?? errorResponse.message)
        throw new Error(errorResponse.response?.data?.message ?? errorResponse.message)
      })
  }

  public async getSeveralFiles (names: string[]): Promise<string[]> {
    const requests = names.map(n => this.getFile(n))
    return await Promise.all(requests)
  }
}

export const filesApiService = new FilesApiService(sessionService)
