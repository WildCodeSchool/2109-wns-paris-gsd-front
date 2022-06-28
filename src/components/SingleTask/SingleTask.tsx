import { useQuery } from '@apollo/client';
import {TASK_BY_ID } from '../../query';
import {ISingleTask} from '../../interfaces/SingleTask';
import SingleTitle from './SingleTask';
import SingleStatus from './SingleTask';
import SingleTaskAssignee from './SingleTaskAssignee';
import SingleDescription from './SingleDescription';
import SingleDeadline from './SingleDeadline';


const SingleTask: React.FC<ISingleTask> = ({taskId}) => {
  const {error, loading, data} = useQuery(TASK_BY_ID, {variables: {data: {taskId}}});
  return (
    <>
      {
        (data && !loading && !error) && (
          <>
            <SingleTitle title={data.getTaskById.project.name} />
            <SingleDescription title={data.getTaskById.title} description={data.getTaskById.description} />
            <SingleTaskAssignee taskCreator={data.getTaskById.taskCreator} project={data.getTaskById.project}/>
            <SingleDeadline estimated_time={data.getTaskById.estimated_time}  starting_time={data.getTaskById.starting_time} advancement={data.getTaskById.advancement}/>
            <SingleStatus  status={data.getTaskById.status} advancement={data.getTaskById.advancement} estimated_time={data.getTaskById.estimated_time}/>
          </>
        )
      }
    </>
  )
}


export default SingleTask;