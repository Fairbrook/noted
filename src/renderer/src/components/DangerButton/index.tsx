import { HTMLProps, memo } from 'react'

function DangerButton(props: HTMLProps<HTMLButtonElement>): JSX.Element {
  return (
    <button {...props} type="button" className={`text-rose-500 text-sm ${props.className || ''}`}>
      {props.children}
    </button>
  )
}

export default memo(DangerButton)
