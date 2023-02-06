import { PropsWithClassName } from '@renderer/types/PropsWithClassname'

function Card(props: PropsWithClassName): JSX.Element {
  return (
    <div className={`bg-secondary rounded-md shadow-gray-600 ${props.className}`}>{props.children}</div>
  )
}

export default Card
