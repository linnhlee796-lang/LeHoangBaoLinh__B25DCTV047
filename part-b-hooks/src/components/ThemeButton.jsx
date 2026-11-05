import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

function ThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return <button onClick={toggleTheme}>{theme === "light" ? "Chế độ tối" : "Chế độ sáng"}</button>;
}

export default ThemeButton;
