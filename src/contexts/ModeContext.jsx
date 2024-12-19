import { createContext, useState } from "react";

export const ModeContext = createContext({});

export const ModeProvider = ({ children }) => {
  const localStorageMode = localStorage.getItem("mode");
  const [mode, setMode] = useState(localStorageMode ?? "light");

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};
