import React, { createContext, useContext } from 'react';
const ThemeContext = createContext('light');
export const useTheme = () => useContext(ThemeContext);
export function ThemeProvider({ children }) {
  return <ThemeContext.Provider value="light">{children}</ThemeContext.Provider>;
}