import './Profile.scss';
import poopie from '../../assets/img/goodpoopie.png';
import DropdownIcon from '../SVG/DropDownIcon';
import useAuth from '../../hooks/useAuth';

const Profile: React.FC = () => {
  const { user, logout } = useAuth()

  return (
    <div className="profile_container">
      <div className="profile_image">
        <img src={poopie} alt="po" />
      </div>
      <div className="profile_name">Hello {user?.username}</div>
      <div className="profile_logout">
        <DropdownIcon />
        <div className="profile_logout_box">
          <button onClick={() => logout()}>Log out</button>
        </div>
      </div>
    </div>
  )
}


export default Profile
