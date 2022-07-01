import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import { UPDATE_PROJECT, GET_PROJECT_BY_ID } from '../../../query'

import ISingleProject from '../../../interfaces/SingleProject'
import { ISingleTask } from '../../../interfaces/SingleTask'
import { StatusName } from '../../../interfaces/Task'

import { format } from 'date-fns'
import '../../SingleTask/SingleDeadline/SingleDeadline.scss'

const SingleProjectDeadline: React.FC<ISingleProject> = ({
  starting_time,
  ending_time,
  projectId,
  tasks,
}) => {
  const [dateInput, setDateInput] = useState<string>(
    format(new Date(ending_time as string | Date | number), 'yyyy-dd-MM')
  )

  const [updateProject, {}] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [
      {
        query: GET_PROJECT_BY_ID,
        variables: { getProjectByIdId: parseFloat('' + projectId) },
      },
    ],
  })

  const endingTime: Date = new Date(ending_time!)

  const getTimeSpent = () => {
    const now = Date.now()
    const startingTime: Date = new Date(starting_time!)
    let timeSpent = now - startingTime.getTime()
    timeSpent = Math.floor(timeSpent / 1000 / 60 / 60)
    return timeSpent
  }

  const getTaskDonePercent = () => {
    const totalTasks = tasks?.length
    const tasksDone = tasks?.filter(
      (task: ISingleTask) => task.status === StatusName.DONE
    ).length
    const taskDonePercent =
      totalTasks === 0 ? '0' : (tasksDone! * 100) / totalTasks!
    return taskDonePercent
  }

  useEffect(() => {
    if (ending_time) {
      setDateInput(
        format(new Date(ending_time as string | Date | number), 'yyyy-dd-MM')
      )
    }
  }, [ending_time])

  const onEndDateChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const newEndDate = new Date(dateInput).getTime()
    const startDate = new Date(
      starting_time as string | number | Date
    ).getTime()

    if (newEndDate < startDate) {
      console.error('not submitted: pick an endDate superior as beginDate')
      return
    }

    const variables = {
      data: {
        ending_time: new Date(dateInput).toISOString(),
        project_id: parseFloat('' + projectId),
      },
    }

    updateProject({ variables }).then()
  }

  return (
    <>
      <div className={`singleProjectDeadline_box_container`}>
        <h3 className={`singleProjectDeadline_box--deadline`}>DEADLINE</h3>
        <div className={`singleProjectDeadline_box__item`}>
          <p>{endingTime.toLocaleDateString('fr')}</p>
        </div>
        <div className={`singleProjectDeadline_box__item`}>
          <p>timeSpent : </p>
          <p className={`singleProjectDeadline_box--bold`}>
            {getTimeSpent()} hours
          </p>
        </div>
        <div className={`singleProjectDeadline_box__item`}>
          <p>Percentage: </p>
          <p className={`singleProjectDeadline_box--bold`}>
            {getTaskDonePercent()}%
          </p>
        </div>
        <form onSubmit={onEndDateChange}>
          <label htmlFor="endingTime">date d&apos;echeance</label>
          <input
            type="date"
            name="ending_time"
            id="endingTime"
            value={dateInput}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDateInput(event.target.value)
            }}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  )
}

export default SingleProjectDeadline
