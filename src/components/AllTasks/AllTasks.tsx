import TasksTable from '../TasksTable/TasksTable'
import Header from '../Header/Header'
import Nav from '../Nav/Nav'
import { ITheme } from '../App/App'

import './AllTasks.scss'


type IAllTasks = ITheme

const AllTasks: React.FC<IAllTasks> = ({theme}) => {
  
  return (
    <>
      <Header />
      <div className="alltasks_container">
        <Nav />
        <TasksTable theme={theme}/>
      </div>
    </>
  )
}

export default AllTasks;
