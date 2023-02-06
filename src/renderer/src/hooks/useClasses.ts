import { getClasses } from '@renderer/services/classes'
import { AppDispatch, RootState } from '@renderer/state'
import { ClassesActions } from '@renderer/state/classes'
import Class from '@renderer/types/class'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uid } from 'uid'
import { addClass as addClassItem } from '@renderer/services/classes'

export interface UseClassesReturn {
  classes: Class[]
  fetchClasses: () => Promise<void>
  addClass: (name: string) => Promise<void>
}

export default function useClasses(): UseClassesReturn {
  const classes = useSelector<RootState, Class[]>((state) => state.clasess)
  const dispatch = useDispatch<AppDispatch>()

  const addClass = useCallback(async (name: string) => {
    const item: Class = {
      id: uid(),
      name,
      notes: []
    }
    await addClassItem(item)
    dispatch(ClassesActions.addClass(item))
  }, [])

  const fetchClasses = useCallback(async () => {
    const classes = await getClasses()
    dispatch(ClassesActions.setClasess(classes))
  }, [dispatch])

  return { classes, fetchClasses, addClass }
}
