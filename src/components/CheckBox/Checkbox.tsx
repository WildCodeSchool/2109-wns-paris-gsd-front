import './Checkbox.scss'
import { IFilters } from '../Filters/Filters'
import { IDefaultSelectValue } from '../TasksTable/TasksTable'

interface ICheckbox extends IFilters {
  label: string;
  value: string;
}

const Checkbox: React.FC<ICheckbox> = ({
  label,
  value,
  selectedOption,
  setSelectedOption,
}) => {
  const handleChange = (): void => {
    const newValue: IDefaultSelectValue = { ...selectedOption}
    
    if (value === 'tasksDone') {
      newValue.tasksDone = !selectedOption.tasksDone;
    } else {
      newValue.myTasks = !selectedOption.myTasks;
    }
    
    setSelectedOption(newValue)
  }
  return (
    <div>
      <input type="checkbox" id={value} name={value} onChange={handleChange} />
      <label htmlFor={value}>{label}</label>
    </div>
  )
}
export default Checkbox
