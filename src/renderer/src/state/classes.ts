import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Class from '@renderer/types/class'
import { RootState } from '.'

export const ClassesSlice = createSlice({
  initialState: [] as Class[],
  name: 'clasess',
  reducers: {
    setClasess: (_, action: PayloadAction<Class[]>) => {
      return action.payload
    },
    addClass: (state, action: PayloadAction<Class>) => {
      state.push(action.payload)
    },
    rmClass: (state, action: PayloadAction<string>) => {
      return state.filter((classItem) => classItem.id !== action.payload)
    },
    updateName: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const index = state.findIndex((item) => item.id === action.payload.id)
      if (index < 0) return
      state[index].name = action.payload.name
    }
  }
})

export const classesReducer = ClassesSlice.reducer
export const ClassesActions = ClassesSlice.actions
export const selectClass =
  (classId: string) =>
  (state: RootState): Class | undefined =>
    state.clasess.find((item) => item.id === classId)
