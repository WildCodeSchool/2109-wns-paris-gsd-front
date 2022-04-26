import './Header.scss';
import Logo from '../Logo/Logo'
import Profile from '../Profile/Profile'

const Header: React.FC = () => (
  <header className="header">
    <Logo />
    <Profile />
  </header>
)

export default Header
