import Class from '@renderer/types/class'
import { PropsWithClassName } from '@renderer/types/PropsWithClassname'
import { memo } from 'react'
import { Link } from 'react-router-dom'
import Title from '../Title'

export interface RowOptionsProps extends PropsWithClassName {
  class: Class
}

function RowOptions(props: RowOptionsProps): JSX.Element {
  return (
    <div className="flex items-center mb-3">
      <div className="flex flex-1 items-baseline">
        <Title className="mr-3 text-2xl">{props.class.name}</Title>
        <Link className="text-sm text-gray-500" to={`/class/${props.class.id}`}>
          Ver más {'>'}
        </Link>
      </div>
    </div>
  )
}

export default memo(RowOptions)
