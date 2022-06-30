import { ISingleTask } from '../../../interfaces/SingleTask'
import './SingleAssets.scss'

const SingleAssets: React.FC<ISingleTask> = ({}) => {
  return (
    <>
      <div className={`singleAssets_box_container`}>
        <h3 className={`singleAssets_box`}>assets</h3>
        <div className={`singleAssets_box__item`}>
          <p>Capture d&apos;écran du:</p>
          <p className={`singleAssets_box--bold`}>13/02/2022</p>
        </div>
        <div className={`singleAssets_box__item`}>
          <p>Capture d&apos;écran du:</p>
          <p className={`singleAssets_box--bold`}>13/02/2022</p>
        </div>
      </div>
    </>
  )
}

export default SingleAssets
