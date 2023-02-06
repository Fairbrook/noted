import { ChangeEventHandler } from 'react'
import Button from '../Button'
import DangerButton from '../DangerButton'
import Modal from '../Modal'
import TextInput from '../TextInput'
import Title from '../Title'

export interface NewClassModalProps {
  visible?: boolean
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onClose?: () => any
  onContinue?: () => any
}

function NewClassModal(props: NewClassModalProps): JSX.Element {
  return (
    <Modal visible={props.visible}>
      <div className="mb-5">
        <Title className="text-lg mb-3">Nombre de la clase</Title>
        <TextInput
          className="w-full"
          placeholder="Nombre"
          value={props.value}
          onChange={props.onChange}
        />
      </div>
      <div className="flex justify-between">
        <DangerButton className="mr-52" onClick={props.onClose}>
          Cancelar
        </DangerButton>
        <Button onClick={props.onContinue}>Continuar</Button>
      </div>
    </Modal>
  )
}

export default NewClassModal
