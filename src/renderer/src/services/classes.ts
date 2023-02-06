import Class from '@renderer/types/class'
import localforage from 'localforage'

export const CLASSES_KEY = '@noted/classes'
export const CLASS_KEY = '@noted/class/'

export async function getClasses(): Promise<Array<Class>> {
  const items = await localforage.getItem<Class[]>(CLASSES_KEY)
  if (!items) return []
  return items
}

export async function addClass(item: Class): Promise<Class[]> {
  const items = await getClasses()
  return localforage.setItem(CLASSES_KEY, [...items, item])
}

export async function rmClass(classId: string): Promise<Class[]> {
  const items = await getClasses()
  return localforage.setItem(
    CLASSES_KEY,
    items.filter((item) => item.id !== classId)
  )
}

export async function updateClassName(classId: string, name: string): Promise<void> {
  const items = await localforage.getItem<Class[]>(CLASSES_KEY)
  if (!items) return
  const index = items.findIndex((item) => item.id === classId)
  if (index < 0) return
  items[index].name = name
  await localforage.setItem(CLASSES_KEY, items)
}
