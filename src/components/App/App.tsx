import { Routes, Route } from 'react-router-dom'
import Login from '../Login/Login'
import Dashboard from '../Dashboard/Dasboard'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}

export default App
