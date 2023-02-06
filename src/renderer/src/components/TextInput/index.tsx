import { DetailedHTMLProps, HTMLProps, InputHTMLAttributes } from 'react'

function TextInput(
  props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
): JSX.Element {
  return (
    <input
      {...props}
      className={`bg-transparent border-b-teal-200 border-b outline-none ${props.className}`}
      type="text"
    />
  )
}

export default TextInput
