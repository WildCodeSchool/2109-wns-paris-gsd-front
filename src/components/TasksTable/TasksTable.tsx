import { useQuery } from '@apollo/client'
import ITask from '../../interfaces/Task'
import { GET_TASKS } from '../../query'

import './TaskTable.scss'

const TasksTable: React.FC = () => {
  const response = useQuery(GET_TASKS)

  const { loading, error, data } = response

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>
  return (
    <div className="task_table_container">
      <table className="task_table">
        <thead className="task_table_header">
          <tr>
            <th className="task_table_header_item--task">Task</th>
            <th className="task_table_header_item--project">Project</th>
            <th className="task_table_header_item--status">Status</th>
            <th className="task_table_header_item--assignee">Assignee</th>
            <th className="task_table_header_item--deadline">Deadline</th>
            <th className="task_table_header_item--progression">%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="task_table_row_item">Cleaner les logs</td>
            <td className="task_table_row_item">Proctofrance</td>
            <td className="task_table_row_item">New</td>
            <td className="task_table_row_item">Valentaing</td>
            <td className="task_table_row_item">11/03/2022</td>
            <td className="task_table_row_item">25</td>
          </tr>
          <tr>
            <td className="task_table_row_item">Cleaner les logs</td>
            <td className="task_table_row_item">Proctofrance</td>
            <td className="task_table_row_item">New</td>
            <td className="task_table_row_item">Valentaing</td>
            <td className="task_table_row_item">11/03/2022</td>
            <td className="task_table_row_item">25</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TasksTable

{
  /* {data.getTasks.map((task: ITask) => (
        <div key={task.id} className="task">
          <h2>{task.title}</h2>
          <h2>{task.description}</h2>
          <h2>{task.estimated_time}</h2>
          <h2>tache cree par: </h2>
          <h2>username: {task.taskCreator?.username} - role: {task.taskCreator?.role?.label}</h2>          
        </div>
      ))} */
}
