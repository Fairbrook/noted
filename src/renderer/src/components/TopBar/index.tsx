import { memo } from 'react'
import Button from '../Button'
import Title from '../Title'

export interface TopBar {
  onNewClass: () => void
}

function TopBar(props: TopBar): JSX.Element {
  return (
    <div className="flex justify-between items-center mb-3">
      <Title className="text-4xl text-cyan-200 font-bold">Noted</Title>
      <div>
        <Button className="text-sm" onClick={props.onNewClass}>
          + Nueva Clase
        </Button>
      </div>
    </div>
  )
}

export default memo(TopBar)
