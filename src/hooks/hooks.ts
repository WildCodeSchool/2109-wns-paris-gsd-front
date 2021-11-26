import { ChangeEvent, useState } from 'react'
import IFormInput from '../interfaces/FormInput'

const useForm = (
  callback: (credentials: IFormInput) => void,
  data: IFormInput
): any => {
  const [values, setValues] = useState(data)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist()
    setValues((values_) => ({
      ...values_,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    onSubmit: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    callback(values);
  
  }

  return {
    handleChange,
    handleSubmit,
    values,
  }
}

export { useForm }
