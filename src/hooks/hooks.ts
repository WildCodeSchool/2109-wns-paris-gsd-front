import { ChangeEvent, useState } from 'react'
import IFormInput from '../interfaces/FormInput'

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle
  };
};

export {  useModal }
