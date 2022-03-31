import './Nav.scss'
import YellowStar from '../../assets/img/yellow-star.png'
import RedStar from '../../assets/img/red-star.png'
import BlueStar from '../../assets/img/blue-star.png'
import { NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

// TODO: gérer le style active
const Nav: React.FC = () => {
  const { user } = useAuth();

  return (
      <nav className="nav">
        <NavLink className="nav_link" to="/tasks">
          <div className="nav_link_icon">
            <img src={YellowStar} alt="yellow star" />
          </div>
          <div className="nav_link_tab">Tasks</div>
        </NavLink>
        <NavLink className="nav_link" to="/projects">
          <div className="nav_link_icon">
            <img src={RedStar} alt="red star" />
          </div>
          <div className="nav_link_tab">Projects</div>
        </NavLink>
        { user && user.role === 'ADMIN' && <NavLink className="nav_link" to="/users">
          <div className="nav_link_icon">
            <img src={BlueStar} alt="blue star" />
          </div>
          <div className="nav_link_tab">Users</div>
        </NavLink>}
      </nav>
    )
  }

export default Nav
