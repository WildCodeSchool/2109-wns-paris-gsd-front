import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import UsersTable from '../UsersTable/UsersTable';
import './Users.scss';

const Users: React.FC = () => {
    return (
        <>
        <Header />
        <div className="allUsers_container">
          <Nav />
          <UsersTable />
        </div>
      </>
    )
}

export default Users;