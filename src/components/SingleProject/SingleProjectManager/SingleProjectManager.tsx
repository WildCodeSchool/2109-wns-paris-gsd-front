import ISingleProject from '../../../interfaces/SingleProject'
import { RoleName } from '../../../interfaces/Role'

const SingleProjectManager: React.FC<ISingleProject> = ({users, projectId}) => {

    const manager = users!.find((user) => user.role.label === RoleName.MANAGER);

    return (
        <>Manager: {manager && manager.username}</>
    )

}

export default SingleProjectManager;