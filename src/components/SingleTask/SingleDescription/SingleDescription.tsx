import { useQuery } from '@apollo/client';
import {ISingleTask} from '../../../interfaces/SingleTask';


const SingleDescription: React.FC<ISingleTask> = ({title, description}) => {
  return (
    <>
      <h3>{title}</h3>
      <p>{description}</p>
    </>
  )
}


export default SingleDescription;