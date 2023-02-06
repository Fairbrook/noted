import Note from '@renderer/types/note'
import NoteWithContent from '@renderer/types/NoteWithContent'
import localforage from 'localforage'
import { CLASS_KEY } from './classes'

const NOTE_KEY = '@noted/note/'
const DIRECTORY = 'noted'
const classNotesKey = (classId: string): string => `${CLASS_KEY}${classId}/notes`

function getLocalKey(noteId: string): string {
  return `${NOTE_KEY}${noteId}`
}

function getFilePath(noteId: string): string {
  return window.api.joinPath(DIRECTORY, `${noteId}.md`)
}

export async function getNotesIdByClass(classId: string): Promise<string[]> {
  const notes = await localforage.getItem<string[]>(classNotesKey(classId))
  if (!notes) {
    return []
  }
  return notes
}

export async function saveNoteInfo(note: Note): Promise<void> {
  await localforage.setItem<Note>(getLocalKey(note.id), {
    id: note.id,
    class_id: note.class_id,
    name: note.name,
    created_at: note.created_at
  })
  console.log('seted')
  let notes = await localforage.getItem<string[]>(classNotesKey(note.class_id))
  console.log('notes')
  if (!notes) {
    notes = []
  }
  if (!notes.includes(note.id)) {
    notes = [note.id, ...notes]
    await localforage.setItem(classNotesKey(note.class_id), notes)
  }
}

export async function saveNoteContent(note: NoteWithContent): Promise<void> {
  await window.api.mkdir(DIRECTORY)
  await window.api.writeFile(getFilePath(note.id), note.content)
}

export async function saveNote(note: NoteWithContent): Promise<void> {
  await Promise.all([saveNoteInfo(note), saveNoteContent(note)])
}

export async function getNoteInfo(noteId: string): Promise<Note | null> {
  const note = await localforage.getItem<Note>(getLocalKey(noteId))
  return note
}

export async function getNoteContent(noteId: string): Promise<string> {
  const note = await window.api.readFile(getFilePath(noteId)).catch(() => '')
  return note || ''
}

export async function getNote(noteId: string): Promise<NoteWithContent | undefined> {
  const [info, content] = await Promise.all([getNoteInfo(noteId), getNoteContent(noteId)])
  if (!info) return
  return { ...info, content } as NoteWithContent
}

export async function rmNoteContent(noteId: string): Promise<void> {
  await window.api.rmFile(getFilePath(noteId)).catch(() => {})
}

export async function rmNoteInfo(noteId: string): Promise<void> {
  const note = await getNoteInfo(noteId)
  if (!note) return
  const notes = await localforage.getItem<string[]>(classNotesKey(note.class_id))
  if (notes) {
    const filtered = notes?.filter((note) => note !== noteId)
    await localforage.setItem(classNotesKey(note.class_id), filtered)
  }
  await localforage.removeItem(getLocalKey(noteId))
}

export async function rmNote(noteId: string): Promise<void> {
  await Promise.all([rmNoteInfo(noteId), rmNoteContent(noteId)])
}
