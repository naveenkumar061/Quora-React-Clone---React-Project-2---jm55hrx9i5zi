import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
    if (!darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }

  const context = { darkMode, setDarkMode, toggleDarkMode };

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
}

function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error('ThemeContext was used outside of ThemeProvider');
  return context;
}

export { ThemeProvider, useThemeContext };
