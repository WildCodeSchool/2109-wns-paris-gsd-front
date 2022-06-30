import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import './App.scss'
import useLocalStorage from 'use-local-storage'
import AllTasks from '../AllTasks/AllTasks'
import AllProjects from '../AllProjects/AllProjects'
import Login from '../Login/Login';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
import Users from '../Users/Users';
import Signup from '../SignUp/Signup'

export interface ITheme {
  theme: string;
 }

const App: React.FC = () => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light')

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if(!user && location.pathname !== '/sign-up' && location.pathname !== '/') {
      navigate('/')
    }
  }, [user, location, navigate])

  return (
    <div className="app" data-theme={theme}>
      <main className="main_container">
        <div className="main_wrapper">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<Signup/>} />
           { user && <Route path="/home" element={<AllTasks theme={theme} />} />}
           { user && <Route path="/projects" element={<AllProjects theme={theme}/>} /> }
           { user?.role.label === 'ADMIN' && <Route path="/users" element={<Users />} /> }
          </Routes>
        </div>
      </main>
      <button className="toggle-button" onClick={switchTheme}>
            You are in {theme} mode
      </button>
    </div>
  )
}

export default App
