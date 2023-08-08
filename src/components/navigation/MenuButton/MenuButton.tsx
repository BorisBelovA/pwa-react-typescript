import { Link } from 'react-router-dom'

interface Props {
  to: string
}

const MenuButton: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <Link to={props.to}>MenuButton</Link>
  )
}
export default MenuButton
