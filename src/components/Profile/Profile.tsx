import './Profile.scss';
import poopie from '../../assets/img/goodpoopie.png';
import DropdownIcon from '../SVG/DropDownIcon';
import classnames from 'classnames';
import useAuth from '../../hooks/useAuth';

const Profile: React.FC = () => {
  const { user, logout } = useAuth()

  return (
    <div className="profile_container">
      <div className="profile_image">
        <img src={poopie} alt="po" />
      </div>
      <div className="profile_name">{user?.username}</div>
      <button style={{backgroundColor: 'black'}} onClick={() => logout()}><DropdownIcon /></button>
    </div>
  )
}


export default Profile
