import { Routes, Route } from 'react-router-dom'
import './App.scss'
import useLocalStorage from 'use-local-storage'
import AllTasks from '../AllTasks/AllTasks'
import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/hooks'

const Content = () => {
  return (
    <div>Je suis une fougere</div>
  )
}

const App: React.FC = () => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light')

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const {isShowing, toggle} = useModal();


  return (
    <div className="app" data-theme={theme}>
      <main className="main_container">
        <div className="main_wrapper">
          <Routes>
            <Route path="/" element={<AllTasks />} />
          </Routes>
          <button className="toggle-button" onClick={switchTheme}>
            You are in {theme} mode
          </button>
          <button className="modal-toggle" onClick={toggle}>
          Show modal
        </button>
        <Modal
          theme={theme}
          isShowing={isShowing}
          hide={toggle}
          content={<Content />}
          />
        </div>
      </main>
    </div>
  )
}

export default App
