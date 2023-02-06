import AddCard from '@renderer/components/ClassRow/AddCard'
import NoteCard from '@renderer/components/ClassRow/NoteCard'
import EditableTopBar from '@renderer/components/EditableTopBar'
import useClass from '@renderer/hooks/useClass'
import useClassNotes from '@renderer/hooks/useClassNotes'
import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'

function Class(): JSX.Element {
  const { classId } = useParams()
  const { class: state, deleteClass, updateName } = useClass(classId || '')
  const { fetchNotes, notes } = useClassNotes(classId || '')

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  if (!state || !classId) return <Navigate to="/" />

  return (
    <div>
      <EditableTopBar
        value={state.name}
        onChange={({ target }): void => {
          updateName(target.value)
        }}
        onDelete={deleteClass}
      />
      <div className="flex flex-wrap ">
        <AddCard className="m-2" classId={classId} />
        {notes.map((note) => (
          <NoteCard className="m-2" key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}

export default Class
