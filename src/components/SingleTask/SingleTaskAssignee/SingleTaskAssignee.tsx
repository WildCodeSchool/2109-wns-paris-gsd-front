
import { ISingleTask } from '../../../interfaces/SingleTask';
import { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_PROJECT_MEMBERS, CHANGE_ASSIGNEE, TASK_BY_ID } from '../../../query';
import DropdownIcon from '../../SVG/DropDownIcon';
import IUser from '../../../interfaces/User';
import './SingleTaskAssignee.scss'

const SingleTaskAssignee: React.FC<ISingleTask> = ({taskCreator, project, taskId}) => {
 
  const projId = project!.id;

  const [getProjectMember, {loading, data, error}] = useLazyQuery(GET_PROJECT_MEMBERS);
  const [changeAssignee, {/* todo loading */ }] = useMutation(CHANGE_ASSIGNEE, {refetchQueries: [{query: TASK_BY_ID, variables: {data: {taskId}}}]});

  
  useEffect(() => {
    getProjectMember({variables: {getProjectByIdId: parseFloat(""+projId)}})
      .then();
  }, [])

  const handleChange = (event:  React.ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value;

    const variables = {
        data: {
          creator_id: parseFloat(userId as string),
          id:  parseFloat(taskId as unknown as string),
    }
  }


    changeAssignee({variables}).then()
  }

  return (
    <>
    <div className={`singleAssignee_box_container`}>
      <div className="select_container select_container singleAssignee_box">
        <h3 className={`singleAssignee_box--title`}>Assignee</h3>
        <select
          className="select"
          id="projectUsers"
          name="projectUsers"
          value={taskCreator?.id}
          data-projectid={project!.id}
          onChange={handleChange}
        >
          {data  && data.getProjectById.users.map((item : IUser, key: number) => (
            <option key={item.id + '' + key} value={item.id}>
              {item.username}
            </option>
          ))}
        </select>
        <DropdownIcon />
        {/* <button className="pouet" onClick={handleDelete}><DeleteIcon/></button> */}
      </div>

    </div>
    </>
  )
}


export default SingleTaskAssignee;