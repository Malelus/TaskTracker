import { useEffect } from 'react';

import { useLocalStorage } from './useLocalStorage';
import useMediaQuery from './useMediaQuery';

// Set the color mode according to user preference or the option selected in the app
const useDarkMode = () => {
  // Current mode saved in local storage, possibility to change it or remove the selection
  const [darkMode, setDarkMode, clearSavedMode] = useLocalStorage<boolean>({ key: 'darkMode' });

  // Checking user color mode preferences on the device
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // Check if the color mode is saved, if not, return the user preference
  const isDarkActive: boolean = darkMode === undefined ? prefersDarkMode : darkMode;

  // Update class name for color mode switching
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkActive);
  }, [isDarkActive]);

  return { isDarkActive, toggleMode: () => setDarkMode((prev) => !prev), clearSavedMode };
};

export default useDarkMode;
