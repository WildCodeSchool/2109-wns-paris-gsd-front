import ISingleProject from '../../../interfaces/SingleProject'
import { RoleName } from '../../../interfaces/Role'
import {ITask} from '../../../interfaces/Task';

const SingleProjectTasks: React.FC<ISingleProject> = ({tasks, projectId}) => {
    
    return (
        <>
            <ul>
                {tasks!.map((task: ITask) => <li key={"user_"+task.id}>{task.title}</li>)}
            </ul>
        </>
    )
}

export default SingleProjectTasks;