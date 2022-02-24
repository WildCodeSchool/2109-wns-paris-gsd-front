import './Profile.scss';
import poopie from '../../assets/img/goodpoopie.png';
import DropdownIcon from '../SVG/DropDownIcon';
import classnames from 'classnames';

const Profile: React.FC = () => (
  <div className="profile_container">
    <div className="profile_image">
      <img src={poopie} alt="po" />
    </div>
    <div className="profile_name">Valentaing</div>
    <DropdownIcon />
  </div>
)

export default Profile
