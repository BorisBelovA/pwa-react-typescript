import { type QuestionnaireBasicType } from 'models'
import { type RootStore } from './RootStore'
import { action, computed, makeAutoObservable, observable, runInAction } from 'mobx'
import { questionnaireService } from 'api-services'
import { mapQuestionnaireToModel } from 'mapping-services'

export class QuestionnaireStore {
  public questionnaire: QuestionnaireBasicType | null = null
  state = 'pending' // 'pending', 'done' or 'error'

  rootStore: RootStore

  constructor (rootStore: RootStore) {
    makeAutoObservable(this, {
      questionnaire: observable,
      setQuestionnaire: action,
      haveQuestionnaire: computed,
      rootStore: false
    })
    this.rootStore = rootStore
    void this.getQuestionnaire()
  }

  public setQuestionnaire (questionnaire: QuestionnaireBasicType): void {
    this.questionnaire = questionnaire
  }

  get haveQuestionnaire (): boolean {
    return this.questionnaire !== null
  }

  public async getQuestionnaire (): Promise<void> {
    this.state = 'pending'

    try {
      const questionnaire = await questionnaireService.getAuthorizedUserQuestionnaire()
      if (questionnaire !== null) {
        runInAction(() => {
          this.questionnaire = mapQuestionnaireToModel(questionnaire)
          this.state = 'done'
        })
      }
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this.state = 'error'
      })
    }
  }

  public deleteQuestionnaire = (): void => {
    this.questionnaire = null
  }
}
