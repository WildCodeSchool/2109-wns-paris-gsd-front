import { useState, useEffect } from 'react'
import IProject from '../../interfaces/Project'

import './ProjectsTable.scss'
import Table from '../Table/Table'

const ProjectsTable: React.FC = () => {
    return (
        <div className="task_table_container">
            <Table
            entity='project'
            columns={['project', 'status', 'manager', 'deadline']}
            data={[]}
            displayData={(item: IProject) => {
                return(
                    <tr key={item.id} >
                        <td>{item.name}</td>
                        <td>{item.starting_time}</td>
                        <td>
                            {/*new Date(parseInt(item.starting_time)).toLocaleDateString()*/}
                        </td>
                    </tr>
                )
            }}
            
            />
        </div>
    )
}
export default ProjectsTable
