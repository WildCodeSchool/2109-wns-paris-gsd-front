import { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/client";


import { ADD_MEMBER, GET_PROJECT_BY_ID, GET_USERS } from "../../../query";
import IUser from "../../../interfaces/User";
import ISingleProject from "../../../interfaces/SingleProject";
import { RoleName } from "../../../interfaces/Role";

import DropdownIcon from "../../SVG/DropDownIcon";
import AddIcon from "../../SVG/AddIcon";
import poopie from '../../../assets/img/goodpoopie.png'
import '../../SingleTask/SingleDeadline/SingleDeadline.scss'
import './../../Profile/Profile.scss'


const SingleProjectMembers: React.FC<ISingleProject> = ({projectId, users, connectedUser}) => {

    const [userId, setUserId] = useState<string>('');
    const [allUsers, setAllUsers] = useState<IUser[]>([]);

    const [addMember, {}] = useMutation(ADD_MEMBER, {refetchQueries: [{query: GET_PROJECT_BY_ID, variables: {getProjectByIdId: parseFloat(""+projectId)}}]});
    const [getUsers, {loading}] = useLazyQuery(GET_USERS)

    const handleChange= (event:  React.ChangeEvent<HTMLSelectElement>) => { 
        console.log(event.target.value);
        setUserId(event.target.value)
    }

    useEffect(() => {
        if (users && users.length !== 0) {

            getUsers().then((res) => {
                const developers = res.data.getUsers.filter((user: IUser) => user.role.label === RoleName.DEVELOPER)
                
                const finalMembers: IUser[] = developers.filter((user: IUser) => {
                    return !users.find((member => member.id === user.id))
                });
                setAllUsers([...finalMembers]);
            })
        }

    }, [users, getUsers])

    
      
    const handleClick = () => {
        if (userId === '') {
            return ;
        }
        const variables: {
            data: {
              projectId: number;
              memberId: number;
            }
          } = {
              data: 
              {
                projectId: parseFloat(""+projectId),
                memberId: parseFloat(userId),
              }
          }
          console.log(variables)
       addMember({variables}).then(() => setUserId(""))
    }
    return (
        <>
              <div className={`singleProjectMembers_box_container`}>
        <h3 className={`singleProjectMembers_box--members`}>Members</h3>
        <div className={`singleProjectMembers_box__itemWithScrollMember`}>
            <ul>
                {users!.map((user: IUser) => {
                     return (
                      <div
                        className={`singleProjectMembers_box__itemWithIcon`}
                        key={'user_' + user.id}
                      >
                        <div className="profile_container">
                          <div className="profile_image">
                            <img src={poopie} alt="po" />
                          </div>
                          <li>{user.username}</li>
                        </div>
                      </div>
                    )
                })}
            </ul>
            {/* {(connectedUser!.role === RoleName.ADMIN || connectedUser!.role === RoleName.MANAGER && allUsers.length) && */}
                <div className="select_container">
                <select
                className="select"
                id="projectUsers"
                name="projectUsers"
                onChange={handleChange}
                value={userId}
                >
                    <option value="" disabled hidden>
                        Choose a user
                    </option>
                {allUsers!.length && allUsers!.map((user : IUser, key: number) => (
                    <option key={user + '' + key} value={user.id}>
                    {user.username}
                    </option>
                ))}
                </select>
                <DropdownIcon />
                <button onClick={handleClick}><AddIcon /></button>
            </div>
            {/* } */}
            </div>
            </div>

        </>
    )

}

export default SingleProjectMembers
