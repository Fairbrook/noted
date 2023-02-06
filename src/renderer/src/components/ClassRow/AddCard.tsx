import useNote from '@renderer/hooks/useNote'
import { PropsWithClassName } from '@renderer/types/PropsWithClassname'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../Card'

export interface AddCardProps extends PropsWithClassName {
  classId: string
}

function AddCard(props: AddCardProps): JSX.Element {
  const navigate = useNavigate()
  const { newNote } = useNote()

  const onNewNote = useCallback(async () => {
      console.log('start')
    const note = await newNote(props.classId)
      console.log('end')
    navigate(`/edit/${note.id}`)
  }, [newNote, props.classId, navigate])

  return (
    <Card className={`w-72 h-52 flex ${props.className}`}>
      <button  onClick={onNewNote} className="flex-1 justify-center items-center flex">
        <span>+ Nueva nota</span>
      </button>
    </Card>
  )
}

export default AddCard
