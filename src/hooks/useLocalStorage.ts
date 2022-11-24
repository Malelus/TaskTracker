import { useCallback, useState, useEffect, Dispatch, SetStateAction } from 'react';

type TStorageType<T> = {
  key: string;
  defaultValue?: T;
};

type TuseStorage<T> = TStorageType<T> & {
  storageObject: Storage;
};

type TuseStorageReturn<T> = [value: T, setValue: Dispatch<SetStateAction<T>>, remove: () => void];

// Save the data in local storage
const useLocalStorage = <T>({ key, defaultValue }: TStorageType<T>) => {
  return useStorage<T>({ key, defaultValue, storageObject: window.localStorage });
};

// Save the data in session storage
const useSessionStorage = <T>({ key, defaultValue }: TStorageType<T>) => {
  return useStorage<T>({ key, defaultValue, storageObject: window.sessionStorage });
};

// Get saved data from local/session storage
const getSavedValue = <T>({ key, defaultValue, storageObject }: TuseStorage<T>) => {
  const jsonValue = storageObject.getItem(key);

  if (jsonValue != null) return JSON.parse(jsonValue);

  return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
};

// Save the current data in the selected storage type, the ability to change or remove the data
const useStorage = <T>({ key, defaultValue, storageObject }: TuseStorage<T>): TuseStorageReturn<T> => {
  const [value, setValue] = useState<T>(() => getSavedValue<T>({ key, defaultValue, storageObject }));

  // Handling the deletion of a key with an undefined value or saving a value to it in the selected storage type
  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);

    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  // Remove the key from the selected storage type
  const remove = useCallback(() => {
    storageObject.removeItem(key);
  }, []);

  return [value, setValue, remove];
};

export { useLocalStorage, useSessionStorage };
