import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import Container from './components/Container'
import { router } from './navigation'
import { store } from './state'

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Container>
        <RouterProvider router={router} />
      </Container>
    </Provider>
  )
}

export default App
