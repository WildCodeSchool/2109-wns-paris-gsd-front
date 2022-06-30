import { useQuery } from '@apollo/client'
import { ISingleTask } from '../../../interfaces/SingleTask'
import './SingleDescription.scss'

const SingleDescription: React.FC<ISingleTask> = ({ title, description }) => {
  return (
    <>
      <div className={`singleDescription_box_container`}>
        <h3 className={`singleDescription_box--title`}>{title}</h3>
        <p className={`singleDescription_box--description`}>{description}</p>
      </div>
    </>
  )
}

export default SingleDescription
