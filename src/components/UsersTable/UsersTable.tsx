import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import Table from "../Table/Table";
import { GET_USERS } from "../../query";
import IUser from "../../interfaces/User";

import './UsersTable.scss';

const UsersTable = () => {
    // query pour recupere les utilisateurs
    const [allUsers, setAllUsers] = useState<IUser[]>([]);

    const {loading, data, error } = useQuery(GET_USERS)

    useEffect(() => {
      console.log(loading)
        if (data && loading === false) {
         setAllUsers(data.getUsers);
        }
    }, [data, loading])

    return (
        <div className="users_table_container">
       {loading ? <div>Loading ....</div> :<Table 
          entity='users'
          columns={['member', 'role']}
          data={[...allUsers].sort((a, b) => a.username.localeCompare(b.username))}
          displayData={(user : IUser) => {
            return (
              <tr key={user.id} className="users">
                <td className={`users_table_row_item`}>{user.username}</td>
                <td className={`users_table_row_item`}>{user.role?.label}</td>
              </tr>
            )
          }}
        />}
       
      </div>
    )
}

export default UsersTable;