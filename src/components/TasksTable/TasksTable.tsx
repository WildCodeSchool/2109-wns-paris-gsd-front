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

//  On crée un objet avec toutes les options de filtres par defaut
const DEFAULT_SELECT_VALUE: IDefaultSelectValue = {
  project: 'All projects',
  tasksDone: false,
  myTasks: false,
}

const TasksTable: React.FC = () => {
  // toutes les taches recu par la db
  const [Alltasks, setAlltasks] = useState([])
  // l'objet contenant les options de tris
  const [selectedTaskFilterOptions, setSelectedTaskFilterOptions] = useState<IDefaultSelectValue>({ ...DEFAULT_SELECT_VALUE })
  // les options de tris
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([])
  // query graphql
  const { loading, error, data } = useQuery(GET_TASKS)

  useEffect(() => {
    if (data) {
      // on recupere d'abord juste le nom de tous les projects qu'on va trier pour les afficher dans le select
      // on va également ajouter le choix par defaut ('tous les projets') dans le tableau passé au select
      const initListProjectsforSelect = () => {
        const taskProjectNames = data.getTasks.map(
          (task: ITask) => task.project.name
        )
        const taskProjectNamesSorted = taskProjectNames.filter(
          (item: string, index: number) => {
            return taskProjectNames.indexOf(item) == index
          }
        )
        taskProjectNamesSorted.unshift(DEFAULT_SELECT_VALUE.project)
        setAlltasks(taskProjectNamesSorted)
        setFilteredTasks([...data.getTasks])
      }
      initListProjectsforSelect()
    }
  }, [data])

  useEffect(() => {
    // On recupere toutes les taches de la db qu'on va filtrer selon les options choisies
    const filterByProjectName = (task: ITask) =>
    // Selon le nom de projet
      selectedTaskFilterOptions.project === DEFAULT_SELECT_VALUE.project
        ? true
        : task.project?.name === selectedTaskFilterOptions.project
    // Selon le statut de la tache
    const filterByTaskDone = (task: ITask) =>
      selectedTaskFilterOptions.tasksDone === false
        ? true
        : task.status !== StatusName.DONE

    if (data) {
      // On applique les deux filters
      const tasksBySelectedProject = data.getTasks
        .filter(filterByProjectName)
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
        listOptions={Alltasks}
        selectedOption={selectedTaskFilterOptions}
        setSelectedOption={setSelectedTaskFilterOptions}
      />
    </div>
  )
}

export default TasksTable