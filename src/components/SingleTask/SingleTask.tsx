import { useLazyQuery } from '@apollo/client'
import { TASK_BY_ID } from '../../query'
import { useEffect } from 'react'
import { ISingleTask } from '../../interfaces/SingleTask'
import SingleTitle from './SingleTitle/SingleTitle'
import SingleStatus from './SingleStatus/SingleStatus'
import SingleTaskAssignee from './SingleTaskAssignee/SingleTaskAssignee'
import SingleDescription from './SingleDescription/SingleDescription'
import SingleDeadline from './SingleDeadline/SingleDeadline'
import SingleAssets from './SingleAssets/SingleAssets'
import './SingleTask.scss'

const SingleTask: React.FC<ISingleTask> = ({ taskId }) => {
  const [getTaskById, { error, loading, data }] = useLazyQuery(TASK_BY_ID)
  useEffect(() => {
    if (taskId) {
      getTaskById({ variables: { data: { taskId } } }).then()
    }
  }, [])

  return (
    <>
      {data && !loading && !error && (
        <>
          <SingleTitle title={data.getTaskById.project.name} />
          <div className={`singleTask_box_container`}>
            <div className={`singleTask_box_column`}>
              <SingleDescription
                title={data.getTaskById.title}
                description={data.getTaskById.description}
              />
              <SingleTaskAssignee
                taskCreator={data.getTaskById.taskCreator}
                project={data.getTaskById.project}
                taskId={taskId}
              />
              <SingleDeadline
                estimated_time={data.getTaskById.estimated_time}
                starting_time={data.getTaskById.starting_time}
                advancement={data.getTaskById.advancement}
              />
              <SingleAssets />
            </div>
            <div className={`singleTask_box_column`}>
              <SingleStatus
                status={data.getTaskById.status}
                advancement={data.getTaskById.advancement}
                estimated_time={data.getTaskById.estimated_time}
                taskId={taskId}
              />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default SingleTask
