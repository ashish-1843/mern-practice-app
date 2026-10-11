import { RouterProvider } from 'react-router'
import './style.css'
import { router } from './app.routes'
import { AuthProvider } from './features/auth/auth.context'
import { NotesProvider } from './features/Dashboard/notes.context'

function App() {

  return (
    <AuthProvider>
      <NotesProvider>
        <RouterProvider router={router} />
      </NotesProvider>
    </AuthProvider>
  )
}

export default App
