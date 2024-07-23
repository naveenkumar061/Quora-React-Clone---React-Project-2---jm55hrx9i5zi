import { createContext, useContext, useState } from 'react';

const ToggleThemeContext = createContext();

function ToggleThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
    if (!darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }

  const context = { darkMode, setDarkMode, toggleDarkMode };

  return (
    <ToggleThemeContext.Provider value={context}>
      {children}
    </ToggleThemeContext.Provider>
  );
}

function useToggleThemeContext() {
  const context = useContext(ToggleThemeContext);
  if (context === undefined)
    throw new Error(
      'ToggleThemeContext was used outside of ToggleThemeProvider'
    );
  return context;
}

export { ToggleThemeProvider, useToggleThemeContext };
