import ISingleProject from '../../../interfaces/SingleProject';
import {useState, useEffect} from 'react';
import goodpoopie from '../../../assets/img/goodpoopie.png';
import badpoopie from '../../../assets/img/badpoopie.png';
import './SingleProjectPoopie.scss';

const SingleProjectPoopie: React.FC<ISingleProject> = ({ending_time, projectId}) => {
    const [isDeadLineOver, setisDeadLineOver] = useState(false);

    const now = Date.now();
    const endingTime: number = new Date(ending_time!).getTime();

    useEffect(() => {
        if (now > endingTime) {
            setisDeadLineOver(true);
        }
    })

    return (
        <>
            {!isDeadLineOver &&
            <div className="poopie_container">
                <img src={goodpoopie} />
                <h2>ALL GOOD!</h2>
            </div>
            }
            {isDeadLineOver &&
            <div className="poopie_container">
                <img src={badpoopie} />
                <h2>YOU ARE LATE!</h2>
            </div>
            }
        </>
        )
}

export default SingleProjectPoopie;