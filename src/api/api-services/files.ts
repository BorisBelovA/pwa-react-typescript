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
    return await http.post<HttpResponse<{
      key: string
    }>>(
      `/file/upload/?typeFile=${type}`,
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
}

export const filesApiService = new FilesApiService(sessionService)
