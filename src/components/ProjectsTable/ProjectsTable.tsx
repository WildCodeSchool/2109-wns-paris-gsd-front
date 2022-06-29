import { useState, useEffect } from 'react'
import IProject from '../../interfaces/Project'
import {useModal } from '../../hooks/hooks';
import Modal from '../Modal/Modal';
import { useQuery } from '@apollo/client'
import SingleProject from '../SingleProject/SingleProject';
import {ITheme} from '../App/App';
import { GET_PROJECTS } from '../../query'
import './ProjectsTable.scss'
import Table from '../Table/Table'

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
            columns={['project', 'status', 'manager', 'deadline']}
            data={[...allProjects]}
            displayData={(item: IProject) => {

                return(
                    <tr key={item.id} className="task modal-toggle" onClick={() => {
                        handleClick(item.id)
                      }}>
                        <td className={`project_table_row_item`}>{item.name}</td>
                        <td className={`project_table_row_item`}>email ?</td>
                        <td className={`project_table_row_item`}>Valentaing vilaing</td>
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
                content={<SingleProject projectId={currentProjectId!} />}
            />
        </div>
    )
}
export default ProjectsTable
