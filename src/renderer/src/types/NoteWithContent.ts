import Note from './note'

export default interface NoteWithContent extends Note {
  content: string
}
