import { configureStore } from '@reduxjs/toolkit'
import { classesReducer, ClassesSlice } from './classes'
import { notesReducer, NotesSlice } from './notes'

export const store = configureStore({
  reducer: {
    [ClassesSlice.name]: classesReducer,
    [NotesSlice.name]: notesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
