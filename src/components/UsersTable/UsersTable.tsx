import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import Table from "../Table/Table";
import { GET_USERS, GET_ROLES } from "../../query";
import IUser from "../../interfaces/User";
import DropdownIcon from '../SVG/DropDownIcon';
import DeleteIcon from '../SVG/DeleteIcon';

import './UsersTable.scss';

export enum RoleName {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  DEVELOPER = 'DEVELOPER',
  USER = 'USER',
}

const UsersTable = () => {
    // query pour recupere les utilisateurs
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const [roles, setRoles] = useState([]);

    const {loading, data, error } = useQuery(GET_USERS);
    const {loading: loadingRoles, data:dataRoles, error:errorRoles } = useQuery(GET_ROLES);


    const handleChange = (event:  React.ChangeEvent<HTMLSelectElement>) => {
      console.log(event.target.value);
    }

    useEffect(() => {
        if (data && loading === false) {
         setAllUsers(data.getUsers);
        }
        if (!loadingRoles && dataRoles) {
          console.log(dataRoles);
          setRoles(dataRoles.getRoles);
        }
    }, [data, loading, loadingRoles, dataRoles])

    return (
        <div className="users_table_container">
          {/* todo une classe pour toutes les erreurs */}
        {error &&  <h2>{`Error: ${error}`}</h2>}
        {loading ? <div>Loading ....</div> :<Table 
          entity='users'
          columns={['member', 'role']}
          data={[...allUsers].sort((a, b) => a.username.localeCompare(b.username))}
          displayData={(user : IUser) => {
            return (
              <tr key={user.id} className="users">
                <td className={`users_table_row_item`}>{user.username}</td>
                <td className={`users_table_row_item`}>
                      <div className="select_container">
                      <select
                        className="select"
                        id="userRole"
                        name="userRole"
                        defaultValue= {user.role.label}
                        onChange={handleChange}
                      >
                        {roles.length && roles.map((item : any, key: number) => (
                          <option key={item + '' + key} value={item.id} >
                            {item.label}
                          </option>
                        ))}
                      </select>
                      <DropdownIcon />
                      {/* <button className="pouet" onClick={handleDelete}><DeleteIcon/></button> */}
                    </div>
                </td>
              </tr>
            )
          }}
        />}
       
      </div>
    )
}

export default UsersTable;