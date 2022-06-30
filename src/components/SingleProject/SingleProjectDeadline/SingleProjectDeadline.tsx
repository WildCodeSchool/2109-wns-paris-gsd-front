import ISingleProject from '../../../interfaces/SingleProject'
import { RoleName } from '../../../interfaces/Role';
import { ISingleTask } from '../../../interfaces/SingleTask';
import { StatusName } from '../../../interfaces/Task';

const SingleProjectDeadline: React.FC<ISingleProject> = ({starting_time, ending_time, projectId, tasks}) => {
    const totalTasks = tasks?.length;
    const tasksDone = tasks?.filter((task: ISingleTask) => task.status === StatusName.DONE).length;
    const taskDonePercent = (totalTasks === 0) ? '0' : (tasksDone!*100)/totalTasks!;
    const now = Date.now();
    const startingTime: Date = new Date(starting_time!);
    let timeSpent = now - startingTime.getTime();
    timeSpent = Math.floor((timeSpent / 1000 / 60 / 60));
    const endingTime: Date = new Date(ending_time!);

    return (
        <>
            <p>{endingTime.toLocaleDateString('fr')}</p>
            <p>timeSpent : {timeSpent} hours</p>
            <p>Percentage: {taskDonePercent}%</p>
        </>
    )

}

export default SingleProjectDeadline;