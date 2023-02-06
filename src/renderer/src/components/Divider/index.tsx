import { PropsWithClassName } from '@renderer/types/PropsWithClassname'
import { memo } from 'react'

function Divider(props: PropsWithClassName): JSX.Element {
  return <hr className={`border-gray-500 ${props.className}`} />
}

export default memo(Divider)
