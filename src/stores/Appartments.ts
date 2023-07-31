import { type Apartment } from 'models'
import { type RootStore } from './RootStore'
import { apartmentService } from 'src/api/api-services/appartment'
import { action, computed, makeAutoObservable, observable } from 'mobx'
import { mapApartmentToModel } from 'mapping-services'
export class ApartmentsStore {
  public apartments: Apartment[] = []

  private readonly rootStore!: RootStore

  constructor (rootStore: RootStore) {
    makeAutoObservable(this, {
      apartments: observable,
      setApartments: action,
      getApartment: action,
      haveApartment: computed
    })
    this.rootStore = rootStore
  }

  public setApartments (apartments: Apartment[]): void {
    this.apartments = apartments
  }

  get haveApartment (): boolean {
    return this.apartments.length > 0
  }

  public linkApartmentToQuestionnaire (apartment: Apartment): void {
    const questionnaire = this.rootStore.questionnaireStore.questionnaire
    if (questionnaire && apartment) {
      apartment.formId = questionnaire.id
      this.rootStore.questionnaireStore.setQuestionnaire({
        ...questionnaire,
        apartment
      })
    }
  }

  public getApartment = async (): Promise<void> => {
    try {
      const apartmentDto = await apartmentService.getApartmentByUser()
      if (apartmentDto !== null) {
        const apartments = apartmentDto.map(ap => mapApartmentToModel(ap))
        this.setApartments(apartments)
      }
    } catch (error) {
      console.error(error)
    }
  }

  public deleteApartments = (): void => {
    this.apartments = [];
  }
}
