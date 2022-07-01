import { useState, useEffect } from 'react'
import { ITask, StatusName } from '../../interfaces/Task'
import Modal from '../Modal/Modal';
import SingleTask from '../SingleTask/SingleTask';
import { useModal } from '../../hooks/hooks'
import { useQuery } from '@apollo/client'
import useAuth from '../../hooks/useAuth';
import { GET_TASKS } from '../../query'
import {ITheme} from '../App/App'; 
import Filters from '../Filters/Filters'

import './TaskTable.scss'
import Table from '../Table/Table'
import { RoleName } from '../../interfaces/Role';


export interface IDefaultSelectValue {
  project: string;
  tasksDone: boolean;
  myTasks: boolean;
}

type ITaskTable = ITheme

//  On crée un objet avec toutes les options de filtres par defaut
const DEFAULT_SELECT_VALUE: IDefaultSelectValue = {
  project: 'All projects',
  tasksDone: false,
  myTasks: false,
}

const TasksTable: React.FC<ITaskTable> = ({theme}) => {
  // toutes les taches recu par la db
  const [Alltasks, setAlltasks] = useState([])
  // l'objet contenant les options de tris
  const [selectedTaskFilterOptions, setSelectedTaskFilterOptions] = useState<IDefaultSelectValue>({ ...DEFAULT_SELECT_VALUE })
  // les options de tris
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([])
  // query graphql
  const { loading, error, data } = useQuery(GET_TASKS)
  // user context 
  const { user } = useAuth()
  // modal
  const {isShowing, toggle} = useModal();

  const [currentTaskId, setCurrentTaskId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (data) {
      // on recupere d'abord juste le nom de tous les projects qu'on va trier pour les afficher dans le select
      // on va également ajouter le choix par defaut ('tous les projets') dans le tableau passé au select
      const initListProjectsforSelect = () => {
        const taskProjectNames = data.getTasks.filter((task: ITask) => {
            if (user?.role.label == RoleName.ADMIN)
              return true;
            
            return task?.project?.users?.find((member => member.id === user?.userId))
        }).map(
          (task: ITask) => task.project?.name
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

  const handleClick = (curTaskId: number| undefined) => {
    setCurrentTaskId(curTaskId);
    toggle();
  }

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
    // Selon l'assigné de la tache
    const filterByTaskAssignee = (task: ITask) =>
      selectedTaskFilterOptions.myTasks === false
        ? true
        : task.taskCreator?.username == user?.username
    if (data) {
      // On applique les deux filters
      const tasksBySelectedProject = data.getTasks
        .filter(filterByProjectName)
        .filter(filterByTaskDone)
        .filter(filterByTaskAssignee)
      setFilteredTasks(tasksBySelectedProject)
    }
  }, [data, selectedTaskFilterOptions, user?.username])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>
  return (
 
    <div className="task_table_container">
      <Table 
        entity='task'
        columns={['task', 'project', 'status', 'assignee', 'deadline', 'progression']}
        data={[...filteredTasks].sort((a,b) => a.title.localeCompare(b.title))}
        displayData={(item : ITask) => {
          return (
            
            <tr key={item.id} className="task modal-toggle" onClick={() => {
              handleClick(item.id)
            }}>
              <td className={`task_table_row_item`}>{item.title}</td>
              <td className={`task_table_row_item`}>{item.project?.name}</td>
              <td className={`task_table_row_item`}>{item.status}</td>
              <td className={`task_table_row_item`}>
                {item.taskCreator?.username}
              </td>
              <td className={`task_table_row_item`}>
                {/* ici on recoit une string time stamp qu'on doit parser en nombre */}
                {new Date(parseInt(item.ending_time)).toLocaleDateString('fr')}
              </td>
              <td className={`task_table_row_item`}>{item.advancement}</td>
            </tr>
            
          )
        }}
      />
      <Filters
        listOptions={Alltasks}
        selectedOption={selectedTaskFilterOptions}
        setSelectedOption={setSelectedTaskFilterOptions}
      />
    <Modal
      isShowing={isShowing}
      hide={toggle}
      theme={theme}
      content={<SingleTask taskId={currentTaskId} />}
    />
    </div>
  )
}

export default TasksTable