import { useTheme } from "../hooks/useTheme";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function ThemeSwitch() {
  const [theme, handleSwitchChange] = useTheme();

  return (
    <FormControlLabel
      className="absolute right-5 top-[25px]"
      control={
        <Switch
          checked={theme === "dark"}
          color="secondary"
          onChange={handleSwitchChange}
        />
      }
      label="Theme"
    />
  );
}