import { useTheme } from "../hooks/useTheme";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeSwitch() {
  const [theme, handleSwitchChange] = useTheme();

  const iconProps = {
    className: "absolute top-[25px] right-5 cursor-pointer",
    size: 40,
    onClick: handleSwitchChange,
  };

  return (
		<>
			{theme === "dark" ? <FaSun {...iconProps} /> : <FaMoon {...iconProps} />}
		</>
	);
}