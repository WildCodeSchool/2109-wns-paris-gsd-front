import { useState, useEffect } from 'react'
import IProject from '../../interfaces/Project'

import { useQuery } from '@apollo/client'

import { GET_PROJECTS } from '../../query'

import './ProjectsTable.scss'
import Table from '../Table/Table'

const ProjectsTable: React.FC = () => {
    const [allProjects, setAllprojects] = useState([])
    const { loading, error, data } = useQuery(GET_PROJECTS)

    useEffect(() => {
        if (data) {
          setAllprojects(data.getProjects);
        }
      }, [data])


      if (loading) return <p>Loading...</p>
      if (error) return <p>Error...</p>
    
    return (
        <div className="project_table_container">
            <Table
            entity='project'
            columns={['project', 'status', 'manager', 'deadline']}
            data={[...allProjects]}
            displayData={(item: IProject) => {

                return(
                    <tr key={item.id} >
                        <td className={`project_table_row_item`}>{item.name}</td>
                        <td className={`project_table_row_item`}>email ?</td>
                        <td className={`project_table_row_item`}>Valentaing vilaing</td>
                        <td className={`task_table_row_item`}>
                        {/* ici on recoit une string time stamp qu'on doit parser en nombre */}
                        {new Date(parseInt(item.ending_time)).toLocaleDateString('fr')}
                        </td>
                    </tr>
                )
            }}
            
            />
        </div>
    )
}
export default ProjectsTable
