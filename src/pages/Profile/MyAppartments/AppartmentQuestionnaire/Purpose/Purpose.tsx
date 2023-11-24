import { Box } from '@mui/material'
import { type ApartmentPurpose, ApartmentsQuestionnaireRoutes } from 'models'
import { useEffect, useMemo } from 'react'
import { type Option, OptionCards } from 'components/OptionCards/OptionCards'
import { apartmentQuestionnaireContext } from '../AppartmentQuestionnaire'
import { t } from '@lingui/macro'

export const Purpose = (): JSX.Element => {
  const { apartment, setApartment, setNextDisabled, setActive, setPercent } = apartmentQuestionnaireContext()

  useEffect(() => {
    setActive(ApartmentsQuestionnaireRoutes.PURPOSE)
    if (apartment.purpose) {
      setPercent(100, 100, ApartmentsQuestionnaireRoutes.PURPOSE)
      setNextDisabled(false)
    }
  }, [])

  const purpose = useMemo(() => {
    return apartment.purpose
  }, [])

  const selectPurpose = (value: ApartmentPurpose | null): void => {
    if (!value) {
      return
    }
    setApartment({
      ...apartment,
      purpose: value
    })
    setPercent(100, 100, ApartmentsQuestionnaireRoutes.PURPOSE)
    setNextDisabled(false)
  }

  const options: Array<Option<ApartmentPurpose>> = [
    { text: t`Rent`, value: 'Rent', icon: 'real_estate_agent' },
    { text: t`Find Roommate`, value: 'Questionnaire', icon: 'co_present' },
    { text: t`Other`, value: 'Other', icon: 'help' }
  ]
  return <Box>
    <OptionCards options={options}
      selected={purpose}
      selectCallback={selectPurpose}
    ></OptionCards>
  </Box>
}
