import { ApartmnetSearchStore } from './ApartmentSearch'
import { ApartmentFiltersStore } from './ApartmentSearchFilters'
import { ApartmentsStore } from './Appartments'
import { QuestionnaireStore } from './Questionnaier'
import { RegistrationStore } from './Registration'
import { ThemeStore } from './ThemeStore'
import { UserStore } from './UserStore'
import { WalkthroughStore } from './WalkthroughStore'

export class RootStore {
  userStore: UserStore
  themeStore: ThemeStore
  apartmentStore: ApartmentsStore
  registrationStore: RegistrationStore
  questionnaireStore: QuestionnaireStore
  apartmentFiltersStore: ApartmentFiltersStore
  apartmentSearchStore: ApartmnetSearchStore
  walkthroughStore: WalkthroughStore

  constructor () {
    this.userStore = new UserStore(this)
    this.themeStore = new ThemeStore(this)
    this.apartmentStore = new ApartmentsStore(this)
    this.registrationStore = new RegistrationStore(this)
    this.questionnaireStore = new QuestionnaireStore(this)
    this.apartmentFiltersStore = new ApartmentFiltersStore(this)
    this.apartmentSearchStore = new ApartmnetSearchStore(this)
    this.walkthroughStore = new WalkthroughStore(this)
  }
}
