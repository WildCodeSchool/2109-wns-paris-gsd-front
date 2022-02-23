import { useQuery } from '@apollo/client'
import ITask from '../../interfaces/Task'
import { GET_TASKS } from '../../query'

import Filters from '../Filters/Filters'

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
          {data.getTasks.map((task: ITask) => (
            <tr key={task.id} className="task">
              <td className="task_table_row_item">{task.title}</td>
              <td className="task_table_row_item">
                {task.project ? task.project.name : undefined}
              </td>
              <td className="task_table_row_item">{task.status}</td>
              <td className="task_table_row_item">Toto</td>
              {/* <td className="task_table_row_item">{task.ending_time?.toISOString()}</td> */}
              <td className="task_table_row_item">{task.ending_time}</td>
              <td className="task_table_row_item">{task.advancement}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Filters />
    </div>
  )
}

export default TasksTable
