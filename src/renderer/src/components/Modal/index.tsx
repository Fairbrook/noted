import { PropsWithClassName } from '@renderer/types/PropsWithClassname'
import styles from './style.module.css'

export interface ModalProps extends PropsWithClassName {
  visible?: boolean
}

function Modal(props: ModalProps): JSX.Element {
  if (!props.visible) {
    return <></>
  }

  return (
    <div className={`${styles.wrapper} ${props.className || ''}`}>
      <div className="bg-bg shadow shadow-gray-600 rounded-md p-5 block">{props.children}</div>
    </div>
  )
}

export default Modal
