import { useState } from 'react';

export const useFormInput = (props) => {
  const [value, setValue] = useState('');
  const [validity, setValidity] = useState(false);

  const inputChangeHandler = (event) => {
    setValue(event.target.value);
    if (event.target.value.trim() === '') {
      setValidity(false);
      return;
    }
    setValidity(true);
  };

  return { value: value, inputChange: inputChangeHandler, validity };
};