import { useQuery } from '@apollo/client';
import {ISingleTask} from '../../../interfaces/SingleTask';
import './SingleTitle.scss'

const SingleTitle: React.FC<ISingleTask> = ({title}) => {
  return (
    <>
      <h2 className={`singleTitle`}>{title}</h2>
    </>
  )
}


export default SingleTitle;