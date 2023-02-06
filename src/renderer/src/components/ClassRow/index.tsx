import Class from '@renderer/types/class'
import AddCard from './AddCard'
import NotesRow from './NotesRow'
import RowOptions from './RowOptions'

export interface ClassRowProps {
  className?: string
  class: Class
}

function ClassRow(props: ClassRowProps): JSX.Element {
  return (
    <div className="mb-5">
      <RowOptions class={props.class} />
      <div>
        <NotesRow classId={props.class.id} />
      </div>
    </div>
  )
}

export default ClassRow
