import './Filters.scss'
import Checkbox from '../CheckBox/Checkbox'
import Select from '../Select/Select'
import { Dispatch, SetStateAction } from 'react'
import { IDefaultSelectValue } from '../TasksTable/TasksTable'

export interface IFilters {
  listOptions: string[];
  selectedOption: IDefaultSelectValue;
  setSelectedOption: Dispatch<SetStateAction<IDefaultSelectValue>>;
}

const Filters: React.FC<IFilters> = (props) => (
  <div className="filters_container">
    {props.listOptions.length && <Select {...props} />}
    <Checkbox value="myTasks" label="Show my tasks" {...props} />
    <Checkbox value="tasksDone" label="Hide done tasks" {...props} />
  </div>
)

export default Filters
