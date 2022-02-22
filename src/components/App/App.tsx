import { Routes, Route } from 'react-router-dom'
import './App.scss'
import useLocalStorage from 'use-local-storage'
import Login from '../Login/Login'
import AllTasks from '../AllTasks/AllTasks'

const App: React.FC = () => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useLocalStorage(
    'theme',
    defaultDark ? 'dark' : 'light'
  )

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return (
    <div className="app" data-theme={theme}>
      <Routes>
        <Route path="/" element={<AllTasks />} />
        <Route path="/dashboard" element={<Login />} />
      </Routes>
      <button className="toggle-button" onClick={switchTheme}>
        {theme} mode
      </button>
    </div>
  )
}

export default App
