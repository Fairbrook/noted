import { HTMLProps, memo } from 'react'

function Label(props: HTMLProps<HTMLLabelElement>): JSX.Element {
  return (
    <label {...props} className={`text-sm ${props.className}`}>
      {props.children}
    </label>
  )
}

export default memo(Label)
