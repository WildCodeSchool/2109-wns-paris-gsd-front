import './Filters.scss'
import Checkbox from '../CheckBox/Checkbox'
import Select from '../Select/Select'
import { Dispatch, SetStateAction } from 'react'

export interface IFilters {
  listOptions: string[];
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
}

const Filters: React.FC<IFilters> = (props) => (
  <div className="filters_container">
    {props.listOptions.length && <Select {...props} />}
    <Checkbox value="myTasks" label="Show my tasks" />
    <Checkbox value="tasksDone" label="Hide done tasks" />
  </div>
)

export default Filters
