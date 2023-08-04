import { Button, Card, CardContent, Checkbox, FormControlLabel, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const TermsAndConditions = (): JSX.Element => {
  const [termsAccepted, setTermsAccepted] = useState(false)
  const navigate = useNavigate()
  const onNextClick = (): void => {
    navigate('/auth/registration')
  }
  return <>
    <h3>Terms of service</h3>
    <Card sx={{ height: '70%', overflowY: 'auto', minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          These Terms of Service reflect the way Roommate business works, the laws that apply to our company,
          and certain things we’ve always believed to be true. As a result, these Terms of Service help define
          Roommate relationship with you as you interact with our services. For example, these terms include
          the following topic headings:
          What you can expect from us, which describes how we provide and develop our services
          What we expect from you, which establishes certain rules for using our services
          Content in Roommate services, which describes the intellectual property rights to the content
          you find in our services — whether that content belongs to you, Roommate, or others
          What you can expect from us, which describes how we provide and develop our services
          What we expect from you, which establishes certain rules for using our services
          These Terms of Service reflect the way Roommate business works, the laws that apply to our company,
          and certain things we’ve always believed to be true. As a result, these Terms of Service help define
          Roommate relationship with you as you interact with our services. For example, these terms include
          the following topic headings:
          What you can expect from us, which describes how we provide and develop our services
          What we expect from you, which establishes certain rules for using our services
          Content in Roommate services, which describes the intellectual property rights to the content
          you find in our services — whether that content belongs to you, Roommate, or others
          What you can expect from us, which describes how we provide and develop our services
          What we expect from you, which establishes certain rules for using our services
        </Typography>
      </CardContent>
    </Card>
    <FormControlLabel
      control={<Checkbox checked={termsAccepted}
        onChange={(event, checked) => { setTermsAccepted(checked) }}
      />} label='I accept terms and conditions' />
    <Button variant='contained' disabled={!termsAccepted} onClick={onNextClick}>Next</Button>
  </>
}
