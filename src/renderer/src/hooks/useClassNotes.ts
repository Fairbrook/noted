import { getNote, getNotesIdByClass } from '@renderer/services/notes'
import { RootState } from '@renderer/state'
import { NotesActions, selectClassNotes } from '@renderer/state/notes'
import NoteWithContent from '@renderer/types/NoteWithContent'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export interface UseClassNotesReturn {
  notes: NoteWithContent[]
  fetchNotes: (limit?: number) => Promise<NoteWithContent[]>
}

export default function useClassNotes(classId: string): UseClassNotesReturn {
  const notes = useSelector<RootState, NoteWithContent[]>(selectClassNotes(classId))
  const dispatch = useDispatch()

  const fetchNotes = useCallback(
    async (limit = -1) => {
      const notesId = await getNotesIdByClass(classId)
      const selected = limit > -1 ? notesId.slice(0, limit) : notesId
      const fetched = await Promise.all(
        selected.map((id) =>
          getNote(id).then((note) => {
            if (!note) throw 'Not found'
            return note
          })
        )
      )
      dispatch(NotesActions.addNotes(fetched))
      return fetched
    },
    [dispatch, classId]
  )

  return { notes, fetchNotes }
}
