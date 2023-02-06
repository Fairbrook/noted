import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import { PropsWithClassName } from '@renderer/types/PropsWithClassname'
import { Viewer } from '@toast-ui/react-editor'
import Card from '../Card'
import NoteWithContent from '@renderer/types/NoteWithContent'
import { memo } from 'react'
import Title from '../Title'
import { Link } from 'react-router-dom'

export interface NoteCardProps extends PropsWithClassName {
  note: NoteWithContent
}

function NoteCard(props: NoteCardProps): JSX.Element {
  return (
    <Card className={`relative w-72 h-52 ${props.className}`}>
      <Link className="w-full h-full" to={`/edit/${props.note.id}`}>
        <div className="w-full h-full pl-2 pr-2 overflow-hidden">
          <Viewer theme="dark" initialValue={props.note.content} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-violet-200 text-gray-700 rounded-b-md pr-3 pl-3">
          <Title className="text-lg">{props.note.name}</Title>
          <div className="text-sm font-light">{props.note.created_at}</div>
        </div>
      </Link>
    </Card>
  )
}

export default memo(NoteCard)
