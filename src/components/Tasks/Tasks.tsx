import { useQuery } from '@apollo/client'
import logo from '../../assets/eee.png'
import './Tasks.scss'
import ITask from '../../interfaces/Task'
import { GET_TASKS } from '../../query'

const Tasks: React.FC = () => {
  const response = useQuery(GET_TASKS)

  const { loading, error, data } = response

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>
  return (
    <div className="App">
      <img src={logo} alt="logo" />
      <div className="task">
        <h1>title</h1>
        <h1>description</h1>
        <h1>Temps estimé</h1>
        <h1>Createur de la tache</h1>
      </div>
      {data.getTasks.map((task: ITask) => (
        <div key={task.id} className="task">
          <h2>{task.title}</h2>
          <h2>{task.description}</h2>
          <h2>{task.estimated_time}</h2>
          <h2>tache cree par: </h2>
          <h2>username: {task.taskCreator?.username} - role: {task.taskCreator?.role?.label}</h2>          
        </div>
      ))}
    </div>
  )
}

export default Tasks
