import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import Table from "../Table/Table";
import { useMutation } from "@apollo/client";
import { GET_USERS, GET_ROLES, UPDATE_USER_ROLE } from "../../query";
import IUser from "../../interfaces/User";
import DropdownIcon from '../SVG/DropDownIcon';
import DeleteIcon from '../SVG/DeleteIcon';

import './UsersTable.scss';
import IRole from "../../interfaces/Role";




const UsersTable = () => {
    // query pour recupere les utilisateurs
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const [roles, setRoles] = useState([]);

    const {loading, data, error } = useQuery(GET_USERS);
    const {loading: loadingRoles, data:dataRoles, error:errorRoles } = useQuery(GET_ROLES);
    const [updateUserRole, { loading: loadingUpdateUserRole, data: newUserRole, error: errorUpdateUserRole }] = useMutation(UPDATE_USER_ROLE, { refetchQueries: [{ query: GET_USERS}] });

    const handleChange = (event:  React.ChangeEvent<HTMLSelectElement>) => {
      const roleId = event.target.value;
      const userId = event.target.getAttribute('data-userid');

      const variables = {
          data: {
        userId,
        roleId,
      }
    }

    updateUserRole({variables}).then(() => {
    })
    }

    useEffect(() => {
        if (data && loading === false) {
         setAllUsers(data.getUsers);
        }
        if (!loadingRoles && dataRoles) {
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
                      <div className="select_container select_container--centered">
                      <select
                        className="select"
                        id="userRole"
                        name="userRole"
                        value={user.role.id}
                        data-userid={user.id}
                        onChange={handleChange}
                      >
                        {roles.length && roles.map((item : IRole, key: number) => (
                          <option key={item + '' + key} value={item.id}>
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