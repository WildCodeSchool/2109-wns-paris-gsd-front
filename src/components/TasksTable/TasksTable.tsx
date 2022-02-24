import { useState, useEffect } from 'react'
import ITask from '../../interfaces/Task'

import { useQuery } from '@apollo/client'

import { GET_TASKS } from '../../query'

import Filters from '../Filters/Filters'

import './TaskTable.scss'

export interface IDefaultSelectValue {
  project: string;
  tasksDone: boolean;
}

const DEFAULT_SELECT_VALUE: IDefaultSelectValue  = {
  project: 'All projects',
  tasksDone: false
};

const TasksTable: React.FC = () => {
  
  const [listProject, setListProject] = useState([])
  const [selectedTaskFilterOptions, setSelectedTaskFilterOptions] = useState<IDefaultSelectValue>({...DEFAULT_SELECT_VALUE})
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([])

  const response = useQuery(GET_TASKS)
  const { loading, error, data } = response;




  useEffect(() => {
    if (data) {
      const initlistProject = () => {
        const taskProjectNames   = data.getTasks.map((task: ITask) => task.project.name);
        const taskProjectNamesSorted = taskProjectNames.filter((item: string, index: number) => {
          return taskProjectNames.indexOf(item) == index;
        })
        taskProjectNamesSorted.unshift(DEFAULT_SELECT_VALUE.project)
        setListProject(taskProjectNamesSorted);
        setFilteredTasks([...data.getTasks])
      }
      initlistProject()
    }
  }, [data])


  useEffect(() => {

    if (!data)
      return

    if (selectedTaskFilterOptions.project === DEFAULT_SELECT_VALUE.project) {
      setFilteredTasks([...data.getTasks]);
      console.log(selectedTaskFilterOptions.project)
      
    } else {
      console.log('prout')
      const tasksBySelectedProject = data.getTasks.filter((task: ITask)  => task.project?.name === selectedTaskFilterOptions.project)
      setFilteredTasks(tasksBySelectedProject)
      console.log(selectedTaskFilterOptions);
    }
  }, [data, selectedTaskFilterOptions]);
 
  
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
      <Filters listOptions={listProject} selectedOption={selectedTaskFilterOptions} setSelectedOption={setSelectedTaskFilterOptions}/>
    </div>
  )
}

export default TasksTable
