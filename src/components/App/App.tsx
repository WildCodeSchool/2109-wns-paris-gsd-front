import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.scss'
import useLocalStorage from 'use-local-storage'
import AllTasks from '../AllTasks/AllTasks'
import AllProjects from '../AllProjects/AllProjects'
import Login from '../Login/Login';
import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/hooks'
import ProjectsTable from '../ProjectsTable/ProjectsTable';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
import Users from '../Users/Users';

// const Content = () => {
//   return (
//     <div>Je suis une fougere</div>
//   )
// }

const App: React.FC = () => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light')

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  // const {isShowing, toggle} = useModal();

  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(user);
  }, [user])

  return (
    <div className="app" data-theme={theme}>
      <main className="main_container">
        <div className="main_wrapper">
          <Routes>
            <Route path="/" element={<Login />} />
           { user && <Route path="/home" element={<AllTasks />} />}
           { user && <Route path="/projects" element={<AllProjects />} /> }
           { user?.role === 'ADMIN' && <Route path="/users" element={<Users />} /> }
          </Routes>
         
          {/* <button className="modal-toggle" onClick={toggle}>
          Show modal
        </button> */}
        {/* <Modal
          theme={theme}
          isShowing={isShowing}
          hide={toggle}
          content={<Content />}
          /> */}
        </div>
      </main>
      <button className="toggle-button" onClick={switchTheme}>
            You are in {theme} mode
      </button>
    </div>
  )
}

export default App
