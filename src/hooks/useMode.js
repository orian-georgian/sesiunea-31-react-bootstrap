import { useContext } from "react";

import { ModeContext } from "../contexts/ModeContext";

export const useMode = () => {
  const modeContext = useContext(ModeContext);

  return modeContext;
};
