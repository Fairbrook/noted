import { memo, PropsWithChildren } from 'react'
import styles from './container.module.css'

function Container(props: PropsWithChildren): JSX.Element {
  return <div className={styles.container}>{props.children}</div>
}

export default memo(Container)
