import { useQuery } from '@apollo/client'
import { ISingleTask } from '../../../interfaces/SingleTask'
import './SingleDeadline.scss'

const SingleDeadline: React.FC<ISingleTask> = ({
  estimated_time,
  starting_time,
  advancement,
}) => {
  const now = Date.now()
  const startingTime: Date = new Date(starting_time!)
  let timeSpent = now - startingTime.getTime()
  timeSpent = Math.floor(timeSpent / 1000 / 60 / 60)
  return (
    <>
      <div className={`singleDeadline_box_container`}>
        <h3 className={`singleDeadline_box`}>DEADLINE</h3>
        <div className={`singleDeadline_box__item`}>
          <p>Estimated_time :</p>
          <p className={`singleDeadline_box--bold`}>{estimated_time}</p>
        </div>
        <div className={`singleDeadline_box__item`}>
          <p>Time spent :</p>
          <p className={`singleDeadline_box--bold`}>{timeSpent}</p>
        </div>
        <div className={`singleDeadline_box__item`}>
          <p>Advancement :</p>
          <p className={`singleDeadline_box--bold`}>{advancement}</p>
        </div>
      </div>
    </>
  )
}

export default SingleDeadline
