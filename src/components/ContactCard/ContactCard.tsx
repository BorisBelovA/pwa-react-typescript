// import { Card, IconButton, SvgIcon, Typography } from '@mui/material'
// import { type Contact } from 'models'
// import styles from './ContactCard.module.scss'
// import EmailIcon from '@mui/icons-material/Email'
// import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
// import { ReactComponent as TelegramIcon } from '../../assets/sm-icons/TelegramIcon.svg'
// import { ReactComponent as InstagramIcon } from '../../assets/sm-icons/InstagramIcon.svg'
// import { ReactComponent as OtherIcon } from '../../assets/sm-icons/OtherIcon.svg'
// import ClearIcon from '@mui/icons-material/Clear'
// import VisibilityIcon from '@mui/icons-material/Visibility'
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
// import { useBasicQuestions } from 'src/layouts/QuestionnaireBasic/QuestionnaireBasic'

// interface Props {
//   contact: Contact
// }

// const Icons = {
//   email: <EmailIcon color='secondary' />,
//   phone: <LocalPhoneIcon color='secondary' />,
//   telegram: <SvgIcon color='secondary'><TelegramIcon /></SvgIcon>,
//   instagram: <SvgIcon color='secondary'><InstagramIcon /></SvgIcon>,
//   other: <SvgIcon color='secondary'><OtherIcon /></SvgIcon>
// }

// const ContactCard = (props: Props): JSX.Element => {
//   const { questions, setQuestions } = useBasicQuestions()
//   return (
//     <Card className={styles.contactCard}>
//       {Icons[props.contact.type]}
//       <Typography className={styles.contactCard__text}>{props.contact.contact}</Typography>
//       <IconButton
//         onClick={() => {
//           setQuestions({
//             ...questions,
//             contacts: questions.contacts.map((contact) => (
//               contact.type === props.contact.type && contact.contact === props.contact.contact ? { ...contact, hidden: contact.hidden === false } : { ...contact }
//             ))
//           })
//         }}
//       >{props.contact.hidden === true ? <VisibilityOffIcon /> : <VisibilityIcon color='primary' />}</IconButton>
//       <IconButton
//         onClick={() => {
//           setQuestions({
//             ...questions,
//             contacts: questions.contacts.filter(contact => (contact.contact !== props.contact.contact || contact.type !== props.contact.type))
//           })
//         }}
//       ><ClearIcon /></IconButton>
//     </Card>
//   )
// }
// export default ContactCard

export const ContactCard = (): JSX.Element => {
  return <></>
}

