import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import NoteWithContent from '@renderer/types/NoteWithContent'
import type { RootState } from '.'

export const NotesSlice = createSlice({
  name: 'notes',
  initialState: [] as NoteWithContent[],
  reducers: {
    setNotes: (_, action: PayloadAction<NoteWithContent[]>) => {
      return action.payload
    },
    addNote: (state, action: PayloadAction<NoteWithContent>) => {
      return [action.payload, ...state]
    },
    rmNote: (state, action: PayloadAction<string>) => {
      return state.filter((note) => note.id !== action.payload)
    },
    updateNote: (state, action: PayloadAction<{ id: string; note: Partial<NoteWithContent> }>) => {
      const noteIndex = state.findIndex((n) => n.id === action.payload.id)
      if (noteIndex < 0) return
      Object.assign(state[noteIndex], action.payload.note)
    },
    addNotes: (state, action: PayloadAction<NoteWithContent[]>) => {
      const ids = action.payload.map((note) => note.id)
      const notesToKeep = state.filter((note) => !ids.includes(note.id))
      return [...notesToKeep, ...action.payload]
    }
  }
})

export const notesReducer = NotesSlice.reducer
export const NotesActions = NotesSlice.actions
export const selectNote =
  (noteId: string) =>
  (state: RootState): NoteWithContent | undefined =>
    state.notes.find((note) => note.id === noteId)
export const selectClassNotes =
  (classId: string) =>
  (state: RootState): NoteWithContent[] =>
    state.notes.filter((note) => note.class_id === classId)
