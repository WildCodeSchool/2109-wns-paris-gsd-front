import ISingleProject from '../../../interfaces/SingleProject'
import { RoleName } from '../../../interfaces/Role'
import { ITask } from '../../../interfaces/Task'
import '../../SingleTask/SingleDeadline/SingleDeadline.scss'

const SingleProjectTasks: React.FC<ISingleProject> = ({ tasks, projectId }) => {
  return (
    <>
      <div className={`singleProjectTasks_box_container`}>
        <h3 className={`singleProjectTasks_box--tasks`}>Tasks</h3>
        <div className={`singleProjectTasks_box__itemWithScroll`}>
          <ul>
            {tasks!.map((task: ITask) => (
              <div key={'user_' + task.id} className={`singleProjectTasks_box__projectsList`}>
                <li>{task.title}</li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default SingleProjectTasks
