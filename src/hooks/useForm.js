import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const onReset = () => {
    setFormState(initialForm);
  };

  const onInputChange = (text) => {
    const {name, value} = text;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onReset,
  };
};
