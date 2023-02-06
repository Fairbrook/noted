import { memo, PropsWithChildren } from 'react'

export interface TitleProps extends PropsWithChildren {
  className?: string
}

function Title(props: TitleProps): JSX.Element {
  return <h1 className={`${props.className || 'text-xl'}`}>{props.children}</h1>
}

export default memo(Title)
