import { useQuery } from '@apollo/client';
import {ISingleTask} from '../../../interfaces/SingleTask';

const SingleTitle: React.FC<ISingleTask> = ({title}) => {
  return (
    <>
      <h2>{title}</h2>
    </>
  )
}


export default SingleTitle;