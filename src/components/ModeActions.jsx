import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useContext } from "react";

import { ModeContext } from "../contexts/ModeContext";

function ModeActions() {
  const { mode, setMode } = useContext(ModeContext);

  function handleLight(e) {
    e.preventDefault();
    localStorage.setItem("mode", "light");
    setMode("light");
  }

  function handleDark(e) {
    e.preventDefault();
    localStorage.setItem("mode", "dark");
    setMode("dark");
  }

  return mode === "light" ? (
    <MdDarkMode
      className="clickable text-dark me-3"
      size={24}
      onClick={handleDark}
    />
  ) : (
    <MdLightMode
      className="clickable text-white me-3"
      size={24}
      onClick={handleLight}
    />
  );
}

export default ModeActions;
