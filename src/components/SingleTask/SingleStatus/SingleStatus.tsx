import { useMutation, useQuery } from '@apollo/client'
import { ISingleTask } from '../../../interfaces/SingleTask'
import { statusList, StatusName } from '../../../interfaces/Task'
import DropdownIcon from '../../SVG/DropDownIcon'
import { UPDATE_TASK, TASK_BY_ID } from '../../../query'
import './SingleStatus.scss'

const advancementTable: number[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

const SingleStatus: React.FC<ISingleTask> = ({
  status,
  advancement,
  estimated_time,
  taskId,
}) => {
  const [updateTask, {}] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: TASK_BY_ID, variables: { data: { taskId } } }],
  })

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus: StatusName = event.target.value as StatusName

    const variables: {
      data: {
        id: number
        status: StatusName
        advancement?: number
      }
    } = {
      data: {
        status: newStatus,
        id: parseFloat(taskId as unknown as string),
      },
    }

    if (newStatus == StatusName.NEW) {
      variables.data.advancement = 0
    } else if (newStatus == StatusName.DONE) {
      variables.data.advancement = 100
    }

    updateTask({ variables }).then()
  }

  const handleAdvancementChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newAdvancement: number = +event.target.value

    const variables: {
      data: {
        id: number
        status?: StatusName
        advancement: number
      }
    } = {
      data: {
        advancement: newAdvancement,
        id: parseFloat(taskId as unknown as string),
      },
    }

    if (newAdvancement == 0) {
      variables.data.status = StatusName.NEW
    } else if (newAdvancement == 100) {
      variables.data.status = StatusName.DONE
    }

    updateTask({ variables }).then()
  }

  return (
    <>
      <div className={`singleStatus_box_container`}>
        <div className={`singleStatus_box__box`}>
          <p className={`singleStatus_box--status singleStatus_box--title`}>
            status
          </p>
          <div className={`singleStatus_box--details`}>
            <div className="select_container">
              <select
                className="select"
                id="taskStatus"
                name="taskStatus"
                value={status}
                onChange={handleStatusChange}
              >
                {statusList.map((item: string, key: number) => (
                  <option key={key} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <DropdownIcon />
            </div>
          </div>
        </div>
        <div className={`singleStatus_box__box`}>
          <p className={`singleStatus_box--percentage singleStatus_box--title`}>
            %
          </p>
          <div className={`singleStatus_box--details`}>
            <div className="select_container">
              <select
                className="select"
                id="taskAdvancement"
                name="taskAdvancement"
                value={advancement}
                onChange={handleAdvancementChange}
              >
                {advancementTable.map((item: number, key: number) => (
                  <option key={key} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <DropdownIcon />
            </div>
          </div>
        </div>
        <div className={`singleStatus_box__box`}>
          <p className={`singleStatus_box--estimation singleStatus_box--title`}>
            Estimation
          </p>
          <p className={`singleDeadline_box--bold singleStatus_box--details`}>
            {estimated_time}
          </p>
        </div>
      </div>
    </>
  )
}

export default SingleStatus
