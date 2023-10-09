import { ApartmentFiltersStore } from './ApartmentSearchFilters'
import { ApartmentsStore } from './Appartments'
import { QuestionnaireStore } from './Questionnaier'
import { RegistrationStore } from './Registration'
import { ThemeStore } from './ThemeStore'
import { UserStore } from './UserStore'

export class RootStore {
  userStore: UserStore
  themeStore: ThemeStore
  apartmentStore: ApartmentsStore
  registrationStore: RegistrationStore
  questionnaireStore: QuestionnaireStore
  apartmentFiltersStore: ApartmentFiltersStore
  constructor () {
    this.userStore = new UserStore(this)
    this.themeStore = new ThemeStore(this)
    this.apartmentStore = new ApartmentsStore(this)
    this.registrationStore = new RegistrationStore(this)
    this.questionnaireStore = new QuestionnaireStore(this)
    this.apartmentFiltersStore = new ApartmentFiltersStore(this)
  }
}
