import {useState} from 'react';

export const useInputValues = () => {
  const [inputValues, setInputValues] = useState({
    title: '',
    ingredients: [],
    time: '',
    instructions: [],
    type: '',
    image: '',
  });

  return {inputValues, setInputValues};
};
