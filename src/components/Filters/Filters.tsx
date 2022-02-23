import './Filters.scss'
import Checkbox from '../CheckBox/Checkbox'
import Select from '../Select/Select'

const Filters: React.FC = () => (
  <div className="filters_container">
    <Select placeholder="All projects" />
    <Checkbox value="myTasks" label="Show my tasks" />
    <Checkbox value="tasksDone" label="Hide done tasks" />
  </div>
)

export default Filters
