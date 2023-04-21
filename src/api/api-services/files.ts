import http from '../common-configuration'
import { type HttpResponse } from '../dto/common-interfaces'
import { type SessionService, sessionService } from './session'

class FilesApiService {
  private readonly sessnioService!: SessionService

  constructor (sessionService: SessionService) {
    this.sessnioService = sessionService
  }

  public async uploadFile (file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)
    /**
     * Ребята сказали, что этот сервис тоже будет наинаться с api/v1
     * так что потом это безобразие убереться
     */
    return await http.post<HttpResponse<{
      key: string
    }>>(
      '/files-storage/upload',
      formData,
      {
        baseURL: '/',
        headers: {
          Authorization: this.sessnioService.authToken,
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
    return await http.get<HttpResponse<string>>(`files-storage/download/${name}`, {
      baseURL: '/',
      headers: {
        Authorization: this.sessnioService.authToken,
        'Content-Type': 'multipart/form-data'
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
}
export const filesApiService = new FilesApiService(sessionService)
