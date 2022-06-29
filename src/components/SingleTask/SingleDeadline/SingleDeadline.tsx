import { useQuery } from '@apollo/client';
import {ISingleTask} from '../../../interfaces/SingleTask';

const SingleDeadline: React.FC<ISingleTask> = ({estimated_time, starting_time, advancement}) => {
  const now = Date.now();
  const startingTime: Date = new Date(starting_time!);
  let timeSpent = now - startingTime.getTime();
  timeSpent = Math.floor((timeSpent / 1000 / 60 / 60));
  return (
    <>
    COMPOSANT SINGLE DEADLINE
    estimated_time : {estimated_time}
    time spent : {timeSpent}
    advancement : {advancement}
    </>
  )
}


export default SingleDeadline;