import { createHashRouter } from 'react-router-dom'
import Class from './views/Class'
import Editor from './views/Editor'
import Home from './views/Home'

export const router = createHashRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/edit/:noteId',
    element: <Editor />
  },
  {
    path: '/class/:classId',
    element: <Class />
  }
])
