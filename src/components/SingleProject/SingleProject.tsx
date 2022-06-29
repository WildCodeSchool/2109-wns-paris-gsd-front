import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_PROJECT_BY_ID } from '../../query';

import ISingleProject from '../../interfaces/SingleProject'
import SingleProjectManager from './SingleProjectManager/SingleProjectManager';

const SingleProject: React.FC<ISingleProject> = ({projectId}) => {

    const [getProjectbyId, {loading, error, data}] = useLazyQuery(GET_PROJECT_BY_ID)

    useEffect(() => {
        if (projectId) {
            console.log(projectId)
            getProjectbyId({variables: {getProjectByIdId: parseFloat(""+projectId)}}).then()
        }
    }, [getProjectbyId, projectId])

    if (data)
    console.log(data);

    return (
      <>
        {
            data &&
                (
                    <>
                        <SingleProjectManager projectId={projectId} users={data.getProjectById.users} />
                    </>
                )
            
        }
        All the single projects
      </>
    )
  }
  
  
  export default SingleProject;