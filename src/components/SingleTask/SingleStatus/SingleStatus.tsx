import { useQuery } from '@apollo/client';
import {ISingleTask} from '../../../interfaces/SingleTask';


const SingleStatus: React.FC<ISingleTask> = ({status, advancement, estimated_time}) => {
  return (
    <>
      <h3>{status}</h3>
      <p>{advancement}</p>
      <p>{estimated_time}</p>
    </>
  )
}


export default SingleStatus;