import ISingleProject from '../../../interfaces/SingleProject'
import { RoleName } from '../../../interfaces/Role'

import '../../SingleTask/SingleTitle/SingleTitle.scss'

const SingleProjectTitle: React.FC<ISingleProject> = ({name, projectId}) => {


    return (
        <h2 className={`singleProjectTitle`}>{name}</h2>
        )
}

export default SingleProjectTitle;