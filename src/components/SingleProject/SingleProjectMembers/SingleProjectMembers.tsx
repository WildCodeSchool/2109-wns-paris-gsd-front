import IUser from "../../../interfaces/User";
import ISingleProject from "../../../interfaces/SingleProject";

const SingleProjectMembers: React.FC<ISingleProject> = ({projectId, users}) => {

    return (
        <>
            <p>Member list:</p>
            <ul>
                {users!.map((user: IUser) => {
                    return <li key={"user_"+user.id}>{user.username}</li>
                })}
            </ul>
        </>
    )

}

export default SingleProjectMembers;