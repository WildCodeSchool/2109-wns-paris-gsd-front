import './Select.scss'
import DropdownIcon from '../SVG/DropDownIcon'
import { IFilters } from '../Filters/Filters'

type ISelect = IFilters

const Select: React.FC<ISelect> = ({
  listOptions,
  selectedOption,
  setSelectedOption,
}) => {
  const handleChange = (event: React.FormEvent<HTMLSelectElement>): void => {
    setSelectedOption({
      project: event.currentTarget.value,
      tasksDone: selectedOption.tasksDone,
    })
  }

  return (
    <div className="select_container">
      <select
        className="select"
        id="title"
        name="title"
        onChange={handleChange}
      >
        {listOptions.map((item: string, key: number) => (
          <option key={item + '' + key} value={item}>
            {item}
          </option>
        ))}
      </select>
      <DropdownIcon />
    </div>
  )
}

export default Select
