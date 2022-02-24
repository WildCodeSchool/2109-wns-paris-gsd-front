import { useState, useEffect } from 'react'
import { ITask, StatusName } from '../../interfaces/Task'

import { useQuery } from '@apollo/client'

import { GET_TASKS } from '../../query'

import Filters from '../Filters/Filters'

import './TaskTable.scss'

export interface IDefaultSelectValue {
  project: string;
  tasksDone: boolean;
  myTasks: boolean;
}

const DEFAULT_SELECT_VALUE: IDefaultSelectValue = {
  project: 'All projects',
  tasksDone: false,
  myTasks: false,
}

const TasksTable: React.FC = () => {
  const [listProject, setListProject] = useState([])
  const [selectedTaskFilterOptions, setSelectedTaskFilterOptions] =
    useState<IDefaultSelectValue>({ ...DEFAULT_SELECT_VALUE })
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([])

  const response = useQuery(GET_TASKS)
  const { loading, error, data } = response

  useEffect(() => {
    if (data) {
      const initlistProject = () => {
        const taskProjectNames = data.getTasks.map(
          (task: ITask) => task.project.name
        )
        const taskProjectNamesSorted = taskProjectNames.filter(
          (item: string, index: number) => {
            return taskProjectNames.indexOf(item) == index
          }
        )
        taskProjectNamesSorted.unshift(DEFAULT_SELECT_VALUE.project)
        setListProject(taskProjectNamesSorted)
        setFilteredTasks([...data.getTasks])
      }
      initlistProject()
    }
  }, [data])

  

  useEffect(() => {
    const filterByName = (task: ITask) =>
      selectedTaskFilterOptions.project === DEFAULT_SELECT_VALUE.project ? true : (task.project?.name === selectedTaskFilterOptions.project);

    const filterByTaskDone = (task: ITask) =>
      selectedTaskFilterOptions.tasksDone === false ? true : task.status !== StatusName.DONE;

    if (data) {
      const tasksBySelectedProject = data.getTasks
        .filter(filterByName)
        .filter(filterByTaskDone)
      setFilteredTasks(tasksBySelectedProject)
    }
        

  }, [data, selectedTaskFilterOptions])

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
          {filteredTasks.map((task: ITask) => {
            return (
              <tr key={task.id} className="task">
                <td className="task_table_row_item">{task.title}</td>
                <td className="task_table_row_item">{task.project?.name}</td>
                <td className="task_table_row_item">{task.status}</td>
                <td className="task_table_row_item">
                  {task.taskCreator?.username}
                </td>
                <td className="task_table_row_item">
                  {/* ici on recoit une string time stamp qu'on doit parser en nombre */}
                  {new Date(parseInt(task.ending_time)).toLocaleDateString()}
                </td>
                <td className="task_table_row_item">{task.advancement}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Filters
        listOptions={listProject}
        selectedOption={selectedTaskFilterOptions}
        setSelectedOption={setSelectedTaskFilterOptions}
      />
    </div>
  )
}

export default TasksTable

// NEW = #fff
// IN_PROGRESS = F4BF42
// PENDING_REVIEW = F48242
// DONE = 21AB38
// REJECTED = #EA3358
