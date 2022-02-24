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
    // On passe l'objet d'option dans une nouvelle valeur
    const newOptionsValue: IDefaultSelectValue = { ...selectedOption }
    // si on veut les taches faites alors la value du checkbox est tasksDone
    if (value === 'tasksDone') {
      newOptionsValue.tasksDone = !selectedOption.tasksDone
      // sinon on veut uniquement mes taches
    } else {
      newOptionsValue.myTasks = !selectedOption.myTasks
    }
    // On passe les nouvelles options de filtres
    setSelectedOption(newOptionsValue)
  }
  return (
    <div>
      <input type="checkbox" id={value} name={value} onChange={handleChange} />
      <label htmlFor={value}>{label}</label>
    </div>
  )
}
export default Checkbox
