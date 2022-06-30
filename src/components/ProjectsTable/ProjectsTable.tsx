import { useState, useEffect } from 'react'
import IProject from '../../interfaces/Project'
import {useModal } from '../../hooks/hooks';
import Modal from '../Modal/Modal';
import { useQuery } from '@apollo/client'
import SingleProject from '../SingleProject/SingleProject';
import {ITheme} from '../App/App';
import {ISingleTask} from '../../interfaces/SingleTask';
import { GET_PROJECTS } from '../../query'
import './ProjectsTable.scss'
import Table from '../Table/Table'
import { StatusName } from '../../interfaces/Task';

type ISingleProject = ITheme;


const ProjectsTable: React.FC<ISingleProject> = ({theme}) => {
    const [allProjects, setAllprojects] = useState([])
    const [currentProjectId, setCurrentProjectId] = useState<number | undefined>(undefined);
    const { loading, error, data } = useQuery(GET_PROJECTS)
    // modal
    const {isShowing, toggle} = useModal();
    useEffect(() => {
        if (data) {
          setAllprojects(data.getProjects);
        }
      }, [data])


      const handleClick = (curProjId: number| undefined) => {
        setCurrentProjectId(curProjId);
        toggle();
      }



    return (
        <div className="project_table_container">
            <Table
            entity='project'
            columns={['project', 'manager', 'progression', 'status', 'deadline']}
            data={[...allProjects]}
            displayData={(item: IProject) => {
                const projectManager = item.users?.find(user => user.role.label === 'MANAGER')?.username;
                const totalTasks = item.tasks?.length;
                const tasksDone = item.tasks?.filter((task: ISingleTask) => task.status === StatusName.DONE).length;
                const projectDonePercent = (totalTasks === 0) ? 0 : (tasksDone!*100)/totalTasks!;

                const projectStatus = projectDonePercent === 0 ? 'NEW' : projectDonePercent === 100 ? 'DONE' : 'IN PROGRESS'; 

                return(
                    <tr key={item.id} className="task modal-toggle" onClick={() => {
                        handleClick(item.id)
                      }}>
                        <td className={`project_table_row_item`}>{item.name}</td>
                        <td className={`project_table_row_item`}>{projectManager}</td>
                        <td className={`project_table_row_item`}>{projectDonePercent}%</td>
                        <td className={`project_table_row_item`}>{projectStatus}</td>
                        <td className={`task_table_row_item`}>
                        {/* ici on recoit une string time stamp qu'on doit parser en nombre */}
                        {new Date(item.ending_time).toLocaleDateString('fr')}
                        </td>
                    </tr>
                )
            }}
            />
            <Modal
                isShowing={isShowing}
                hide={toggle}
                theme={theme}
                content={<SingleProject projectId={currentProjectId as number} />}
            />
        </div>
    )
}
export default ProjectsTable
