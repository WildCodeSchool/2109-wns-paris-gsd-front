import ISingleProject from '../../../interfaces/SingleProject'
import { RoleName } from '../../../interfaces/Role'
import '../../SingleTask/SingleDeadline/SingleDeadline.scss'

const SingleProjectDeadline: React.FC<ISingleProject> = (
  { starting_time, ending_time, projectId },
  tasks
) => {
  const totalTasks = tasks.length
  // const tasksDone = taks.filter
  const now = Date.now()
  const startingTime: Date = new Date(starting_time!)
  let timeSpent = now - startingTime.getTime()
  timeSpent = Math.floor(timeSpent / 1000 / 60 / 60)
  const endingTime: Date = new Date(ending_time!)
  return (
    <>
      <div className={`singleProjectDeadline_box_container`}>
        <h3 className={`singleProjectDeadline_box--deadline`}>DEADLINE</h3>
        <div className={`singleProjectDeadline_box__item`}>
          <p>{endingTime.toLocaleDateString('fr')}</p>
        </div>
        <div className={`singleProjectDeadline_box__item`}>
          <p>timeSpent : </p>
          <p className={`singleProjectDeadline_box--bold`}>{timeSpent} hours</p>
        </div>
      </div>
    </>
  )
}

export default SingleProjectDeadline
