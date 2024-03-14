import {useState} from 'react';

export const useInputValues = () => {
  const [inputValues, setInputValues] = useState({
    name: '',
    ingredients: [
      {
        name: '',
        quantity: '',
      },
    ],
    preparationTime: '',
    instructions: [],
    type: '',
    image: '',
    createdBy: '65279c9b6f00bfbec806be87',
  });

  return {inputValues, setInputValues};
};
