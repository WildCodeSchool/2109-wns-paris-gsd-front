import IUser from '../../../interfaces/User'
import ISingleProject from '../../../interfaces/SingleProject'
import poopie from '../../../assets/img/goodpoopie.png'
import '../../SingleTask/SingleDeadline/SingleDeadline.scss'
import './../../Profile/Profile.scss'
const SingleProjectMembers: React.FC<ISingleProject> = ({
  projectId,
  users,
}) => {
  return (
    <>
      <div className={`singleProjectMembers_box_container`}>
        <h3 className={`singleProjectMembers_box--members`}>Members</h3>
        <div className={`singleProjectMembers_box__itemWithScrollMember`}>
          <ul>
            {users!.map((user: IUser) => {
              return (
                <div
                  className={`singleProjectMembers_box__itemWithIcon`}
                  key={'user_' + user.id}
                >
                  <div className="profile_container">
                    <div className="profile_image">
                      <img src={poopie} alt="po" />
                    </div>
                    <li>{user.username}</li>
                  </div>
                </div>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

export default SingleProjectMembers
