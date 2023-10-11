import { type QuestionnaireBasicType } from 'models'
import { type RootStore } from './RootStore'
import { action, computed, makeAutoObservable, observable } from 'mobx'
import { questionnaireService } from 'api-services'
import { mapQuestionnaireToModel } from 'mapping-services'

export class QuestionnaireStore {
  public questionnaire: QuestionnaireBasicType | null = null

  rootStore: RootStore

  constructor (rootStore: RootStore) {
    makeAutoObservable(this, {
      questionnaire: observable,
      setQuestionnaire: action,
      getQuestionnaire: action,
      haveQuestionnaire: computed,
      rootStore: false
    })
    this.rootStore = rootStore
  }

  public setQuestionnaire (questionnaire: QuestionnaireBasicType): void {
    this.questionnaire = questionnaire
  }

  get haveQuestionnaire (): boolean {
    return this.questionnaire !== null
  }

  public getQuestionnaire = async (): Promise<void> => {
    try {
      const questionnaire = await questionnaireService.getAuthorizedUserQuestionnaire()
      if (questionnaire !== null) {
        this.setQuestionnaire(mapQuestionnaireToModel(questionnaire))
      }
    } catch (error) {
      console.error(error)
    }
  }

  public deleteQuestionnaire = (): void => {
    this.questionnaire = null
  }
}
