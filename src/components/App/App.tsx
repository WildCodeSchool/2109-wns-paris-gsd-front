import { Routes, Route } from 'react-router-dom'
import Login from '../Login/Login'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  )
}

export default App
