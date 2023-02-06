import { ChangeEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'
import DangerButton from '../DangerButton'
import Divider from '../Divider'
import Modal from '../Modal'
import TextInput from '../TextInput'
import Title from '../Title'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import DeleteIcon from '@mui/icons-material/Delete'

export interface EditableTopBar {
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onDelete?: () => any
}

function EditableTopBar(props: EditableTopBar): JSX.Element {
  const navigate = useNavigate()
  const [confirmVisible, setConfirmVisible] = useState(false)

  return (
    <div className="mb-5">
      <div className="w-full mb-3 flex items-center justify-between">
        <div className="flex-1">
          <button
            className="text-2xl font-bold mr-5"
            onClick={(): void => {
              navigate(-1)
            }}
          >
            <ArrowBackIosNewIcon />
          </button>
          <TextInput
            className="w-1/2 text-2xl pl-2 mr-7"
            value={props.value}
            onChange={props.onChange}
          />
        </div>
        <div>
          <DangerButton onClick={(): void => setConfirmVisible(true)}>
            <DeleteIcon />
          </DangerButton>
        </div>
      </div>
      <div>
        <Divider />
      </div>
      <Modal className="z-10" visible={confirmVisible}>
        <Title className="mb-5">¿Seguro de eliminar el recurso?</Title>
        <div className="flex justify-between">
          <Button onClick={(): void => setConfirmVisible(false)}>Cancelar</Button>
          <DangerButton
            onClick={(): void => {
              setConfirmVisible(false)
              if (props.onDelete) {
                props.onDelete()
              }
            }}
          >
            Eliminar
          </DangerButton>
        </div>
      </Modal>
    </div>
  )
}

export default EditableTopBar
