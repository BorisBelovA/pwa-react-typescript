import { type Appartment } from 'models'
import { type RootStore } from './RootStore'
import { appartmentService } from 'src/api/api-services/appartment'
import { filesApiService } from 'src/api/api-services/files'
import { mapAppartmentToModel, mapFileToBase64 } from 'mapping-services'
import { action, computed, makeAutoObservable, observable } from 'mobx'
export class AppartmentsStore {
  appartments: Appartment[] = []

  private readonly rootStore!: RootStore

  constructor (rootStore: RootStore) {
    makeAutoObservable(this, {
      appartments: observable,
      setAppartments: action,
      getAppartmet: action,
      haveAppartment: computed
    })
    this.rootStore = rootStore
  }

  public setAppartments (appartments: Appartment[]): void {
    this.appartments = appartments
  }

  get haveAppartment (): boolean {
    return this.appartments.length > 0
  }

  public getAppartmet = async (): Promise<void> => {
    try {
      const appartmentDto = await appartmentService.getAppartmentByUser()
      if (appartmentDto !== null) {
        const appartment = mapAppartmentToModel(appartmentDto)
        const photos = await filesApiService.getSeveralFiles(appartment.photos)
        const photosBase64 = photos.map(p => mapFileToBase64(p))
        appartment.photos = photosBase64
        this.setAppartments([appartment])
      }
    } catch (error) {
      console.error(error)
    }
  }
}
