import './Checkbox.scss'

const Checkbox: React.FC<{value: string, label: string}>  = ({value, label}) => (
  <div>
    <input type="checkbox" id={value} name={value} />
    <label htmlFor={value}>{label}</label>
  </div>
)

export default Checkbox
