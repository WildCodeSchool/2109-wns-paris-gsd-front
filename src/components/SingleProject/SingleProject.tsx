import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import { GET_PROJECT_BY_ID } from '../../query';

import ISingleProject from '../../interfaces/SingleProject'

import SingleProjectDeadline from './SingleProjectDeadline/SingleProjectDeadline';
import SingleProjectManager from './SingleProjectManager/SingleProjectManager';
import SingleProjectMembers from './SingleProjectMembers/SingleProjectMembers';
import SingleProjectTasks from './SingleProjectTasks/SingleProjectTasks';
import SingleProjectTitle from './SingleProjectTitle/SingleProjectTitle';
import SinglePoopie from './SingleProjectPoopie/SingleProjectPoopie';
import useAuth from '../../hooks/useAuth';


const SingleProject: React.FC<ISingleProject> = ({projectId}) => {

    const [getProjectbyId, {loading, error, data}] = useLazyQuery(GET_PROJECT_BY_ID);
    const { user } = useAuth();


    useEffect(() => {
        if (projectId) {
            getProjectbyId({variables: {getProjectByIdId: parseFloat(""+projectId)}}).then((res) => console.log(res))
        }
    }, [getProjectbyId, projectId])


    return (
      <>
        {
            data &&
                (
                    <>
                        <SinglePoopie projectId={projectId} ending_time={data.getProjectById.ending_time}/>
                        <SingleProjectTitle projectId={projectId} name={data.getProjectById.name}/>
                        <SingleProjectManager projectId={projectId} users={data.getProjectById.users} />
                        <SingleProjectDeadline projectId={projectId}  starting_time= {data.getProjectById.starting_time} ending_time= {data.getProjectById.ending_time} tasks= {data.getProjectById.tasks}/>
                        <SingleProjectMembers users={data.getProjectById.users} projectId={projectId} connectedUser={user} />
                        <SingleProjectTasks tasks={data.getProjectById.tasks} projectId={projectId}/>
                    </>
                )
        }
      </>
    )
  }
  
  
  export default SingleProject;