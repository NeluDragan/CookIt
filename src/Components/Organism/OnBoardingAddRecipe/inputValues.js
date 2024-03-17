import {useState} from 'react';

export const useInputValues = () => {
  const [inputValues, setInputValues] = useState({
    name: '',
    ingredients: [
      {
        id: '',
        quantity: '',
      },
    ],
    preparationTime: '',
    instructions: [],
    type: '',
    image: '',
    createdBy: '',
  });

  return {inputValues, setInputValues};
};
