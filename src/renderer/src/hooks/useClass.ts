import { rmClass, updateClassName } from '@renderer/services/classes'
import { ClassesActions, selectClass } from '@renderer/state/classes'
import Class from '@renderer/types/class'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export interface UseClassReturn {
  class: Class | undefined
  updateName: (name: string) => Promise<void>
  deleteClass: () => Promise<void>
}
export default function useClass(classId: string): UseClassReturn {
  const classState = useSelector(selectClass(classId))
  const dispatch = useDispatch()

  const updateName = useCallback(
    async (name: string) => {
      if (!classId) return
      await updateClassName(classId, name)
      dispatch(ClassesActions.updateName({ id: classId, name }))
    },
    [classId]
  )

  const deleteClass = useCallback(async () => {
    if (!classId) return
    await rmClass(classId)
    dispatch(ClassesActions.rmClass(classId))
  }, [classId])

  return { class: classState, updateName, deleteClass }
}
