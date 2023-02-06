import useClassNotes from '@renderer/hooks/useClassNotes'
import { PropsWithClassName } from '@renderer/types/PropsWithClassname'
import { useEffect } from 'react'
import AddCard from './AddCard'
import NoteCard from './NoteCard'
import styles from './style.module.css'

export interface NotesRowProps extends PropsWithClassName {
  classId: string
}

function NotesRow(props: NotesRowProps): JSX.Element {
  const { fetchNotes, notes } = useClassNotes(props.classId)

  useEffect(() => {
    fetchNotes(5)
  }, [fetchNotes])

  return (
    <div className="flex w-full overflow-x-scroll pb-5">
      <AddCard className={styles.card} classId={props.classId} />
      {notes.map((note) => (
        <NoteCard className={styles.card} key={note.id} note={note} />
      ))}
    </div>
  )
}

export default NotesRow
