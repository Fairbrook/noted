import ClassRow from '@renderer/components/ClassRow'
import Divider from '@renderer/components/Divider'
import NewClassModal from '@renderer/components/NewClassModal'
import TopBar from '@renderer/components/TopBar'
import useClasses from '@renderer/hooks/useClasses'
import { useEffect, useState } from 'react'

function Home(): JSX.Element {
  const [showNameModal, setNameModal] = useState(false)
  const [name, setName] = useState('')
  const { addClass, classes, fetchClasses } = useClasses()

  useEffect(() => {
    fetchClasses()
  }, [fetchClasses])

  return (
    <div>
      <TopBar onNewClass={(): void => setNameModal(true)} />
      <Divider className="mb-4" />
      {classes.map((item) => (
        <ClassRow key={item.id} class={item} />
      ))}
      <NewClassModal
        visible={showNameModal}
        value={name}
        onChange={({ target }): void => {
          setName(target.value)
        }}
        onContinue={async (): Promise<void> => {
          await addClass(name)
          setName('')
          setNameModal(false)
        }}
        onClose={(): void => {
          setName('')
          setNameModal(false)
        }}
      />
    </div>
  )
}
export default Home
