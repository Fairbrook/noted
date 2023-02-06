import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import { Editor as EditorJS } from '@toast-ui/react-editor'
import { useCallback, useRef } from 'react'
import useNote from '@renderer/hooks/useNote'
import { Navigate, useParams } from 'react-router-dom'
import EditableTopBar from '@renderer/components/EditableTopBar'

function Editor(): JSX.Element {
  const { noteId } = useParams()
  const { updateContent, note, updateName, deleteNote } = useNote(noteId)
  const editorRef = useRef<EditorJS | null>()
  const timeoutRef = useRef<NodeJS.Timeout>()

  const onSave = useCallback((): void => {
    if (typeof timeoutRef.current !== 'undefined') {
      clearTimeout(timeoutRef.current)
    }
    if (!editorRef.current) return
    const markdown = editorRef.current?.getInstance().getMarkdown()
    if (typeof markdown !== 'string') return
    timeoutRef.current = setTimeout(() => {
      updateContent(markdown)
    }, 500)
  }, [])

  if (!note) return <Navigate to="/" />

  return (
    <div>
      <EditableTopBar
        value={note.name}
        onChange={({ target }): void => {
          updateName(target.value)
        }}
        onDelete={deleteNote}
      />
      <EditorJS
        ref={(r): void => {
          editorRef.current = r
        }}
        theme="dark"
        height="80vh"
        initialValue={note.content}
        onChange={onSave}
        placeholder="Que esperas, a escribir..."
      />
    </div>
  )
}

export default Editor
