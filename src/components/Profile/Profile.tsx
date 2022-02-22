import './Profile.scss';
import poopie from '../../assets/img/goodpoopie.png'

const Profile: React.FC = () => (
  <div className="profile_container">
    <div className="profile_image">
      <img src={poopie} alt="po" />
    </div>
    <div className="profile_name">Valentaing</div>
  </div>
)

export default Profile
