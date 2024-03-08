"use clinet";
import { createContext, useState, useContext } from "react";
import themes from "./themes"

export const GlobalContext = createContext();
export const GlobalUpdadeContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedThem] = useState(0)
  const theme = themes[selectedTheme]

  return (
    <GlobalContext.Provider value={{
      value: {{
        theme,
      }}
    }}>
      <GlobalUpdadeContext.Provider value={setGlobalState}>
        {children}
      </GlobalUpdadeContext.Provider>
    </GlobalContext.Provider>
  );
};
