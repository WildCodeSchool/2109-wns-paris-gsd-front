import './Select.scss'
import DropdownIcon from '../SVG/DropDownIcon'

const Select: React.FC<{placeholder: string}> = ({ placeholder }) =>  (
  <div className="select_container">
    <select className="select" id="title" name="title">
      <option defaultValue={placeholder} >
        {placeholder}
      </option>
      <option value="Example">Example</option>
    </select>
      <DropdownIcon />
  </div>
)

export default Select
