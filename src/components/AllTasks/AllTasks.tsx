


import TasksTable from '../TasksTable/TasksTable'
import Header from '../Header/Header'
import Nav from '../Nav/Nav'
import './AllTasks.scss'

const AllTasks: React.FC = () => {
  
  return (
    <>
      <Header />
      <div className="alltasks_container">
        <Nav />
        <TasksTable />
      </div>
    </>
  )
}

export default AllTasks;
