
import {ISingleTask} from '../../interfaces/SingleTask';

const SingleTaskAssignee: React.FC<ISingleTask> = ({taskCreator, project}) => {
  return (
    <>
      <p>taskcreator: { taskCreator?.username }</p>
      <p>projectId: {project?.id}</p>
    </>
  )
}


export default SingleTaskAssignee;