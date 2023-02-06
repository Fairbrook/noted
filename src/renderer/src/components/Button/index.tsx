import { HTMLProps, memo } from 'react'
import styles from './style.module.css'

function Button(props: HTMLProps<HTMLButtonElement>): JSX.Element {
  return (
    <button {...props} type="button" className={`${styles.button} ${props.className}`}>
      {props.children}
    </button>
  )
}

export default memo(Button)
