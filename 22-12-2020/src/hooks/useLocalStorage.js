import { useState, useEffect } from 'react';

const useLocalStorage = (storageKey) => {
  const storedValue = localStorage.getItem(storageKey);
  const initialValue = storedValue ? storedValue.split(',') : [];

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(storageKey, value);
  }, [value]);

  return { value, setValue };
};

export { useLocalStorage };
