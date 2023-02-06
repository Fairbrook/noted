import { rmNote, saveNoteContent, saveNoteInfo } from '@renderer/services/notes'
import { RootState } from '@renderer/state'
import { NotesActions, selectNote } from '@renderer/state/notes'
import NoteWithContent from '@renderer/types/NoteWithContent'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uid } from 'uid'

export interface UseNoteProps {
  note?: NoteWithContent
  newNote: (classId: string) => Promise<NoteWithContent>
  updateContent: (content: string) => Promise<void>
  updateName: (name: string) => Promise<void>
  deleteNote: () => Promise<void>
}

export default function useNote(id?: string): UseNoteProps {
  const note = useSelector<RootState, NoteWithContent | undefined>(selectNote(id || ''))
  const dispatch = useDispatch()

  const newNote = useCallback(async (classId: string) => {
    const newNote: NoteWithContent = {
      id: uid(),
      name: 'Sin título',
      class_id: classId,
      content: '',
      created_at: new Date().toLocaleDateString()
    }
    dispatch(NotesActions.addNote(newNote))
    console.log('dispatched')
    await saveNoteInfo(newNote)
    return newNote
  }, [])

  const updateContent = useCallback(
    async (content: string) => {
      if (!id || !note) return
      await saveNoteContent({ ...note, content })
      dispatch(NotesActions.updateNote({ id, note: { content } }))
    },
    [note, id]
  )

  const updateName = useCallback(
    async (name: string) => {
      if (!id || !note) return
      await saveNoteInfo({ ...note, name })
      dispatch(NotesActions.updateNote({ id, note: { name } }))
    },
    [note, id]
  )

  const deleteNote = useCallback(async () => {
    if (!id) return
    await rmNote(id)
    dispatch(NotesActions.rmNote(id))
  }, [id])

  return { note, newNote, updateContent, updateName, deleteNote }
}
