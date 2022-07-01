import ISingleProject from '../../../interfaces/SingleProject'
import { RoleName } from '../../../interfaces/Role'
import poopie from '../../../assets/img/goodpoopie.png'
import '../../SingleTask/SingleDeadline/SingleDeadline.scss'
import './../../Profile/Profile.scss'

const SingleProjectManager: React.FC<ISingleProject> = ({
  users,
  projectId,
}) => {
  const manager = users!.find((user) => user.role.label === RoleName.MANAGER)

  return (
    <>
      <div className={`singleProjectManager_box_container`}>
        <h3 className={`singleProjectManager_box--manager`}>Manager</h3>

        <div className={`singleProjectManager_box__itemWithIcon`}>
          <div className="profile_container">
            <div className="profile_image">
              <img src={poopie} alt="po" />
            </div>
            <p>{manager && manager.username} </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleProjectManager
