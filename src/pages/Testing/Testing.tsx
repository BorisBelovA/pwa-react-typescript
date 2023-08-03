import { Typography } from "@mui/material"
import CardBase from "src/components/Cards/CardBase/CardBase"
import styles from './Testing.module.scss'

interface Props {}
const Testing = (props: Props) => {
  const header = (<div>header</div>)
  const content = (<div>header</div>)
  return (
    <>
      <Typography variant="h1" className={styles.header}>Your profile</Typography>
      <CardBase header={header} content={content} />
    </>
  )
}
export default Testing