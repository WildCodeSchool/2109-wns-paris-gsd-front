import IUser from "../../../interfaces/User";
import ISingleProject from "../../../interfaces/SingleProject";
import DropdownIcon from "../../SVG/DropDownIcon";

const SingleProjectMembers: React.FC<ISingleProject> = ({projectId, users, connectedUser}) => {

    const handleChange = (event:  React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target)
    }
    return (
        <>
            <p>Member list:</p>
            <ul>
                {users!.map((user: IUser) => {
                    return <li key={"user_"+user.id}>{user.username}</li>
                })}
            </ul>
            {connectedUser!.role === "ADMIN" || 'MANAGER' &&
                <div className="select_container">
                <select
                className="select"
                id="projectUsers"
                name="projectUsers"
                onChange={handleChange}
                >
                {users!.length && users!.map((user : IUser, key: number) => (
                    <option key={user + '' + key} value={user.id}>
                    {user.username}
                    </option>
                ))}
                </select>
                <DropdownIcon />
            </div>
            }
        </>
    )

}

export default SingleProjectMembers;