import ISingleProject from '../../../interfaces/SingleProject'
import { RoleName } from '../../../interfaces/Role'

const SingleProjectTitle: React.FC<ISingleProject> = ({name, projectId}) => {


    return (
        <h2>{name}</h2>
        )
}

export default SingleProjectTitle;