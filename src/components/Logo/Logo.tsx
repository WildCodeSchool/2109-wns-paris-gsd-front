import logo from '../../assets/img/logo.png'
import './Logo.scss';
import { Link } from 'react-router-dom'

const Logo: React.FC = () => (
  <Link to="/">
    <div className="logo_container">
      <img src={logo} alt="logo" />
    </div>
  </Link>
)

export default Logo
