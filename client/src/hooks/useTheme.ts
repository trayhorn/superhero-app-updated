import { useState, useEffect } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<string>(() => {
		const savedTheme = localStorage.getItem("theme");
		return savedTheme ? savedTheme : "dark";
  });
  
  const handleSwitchChange = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }
	useEffect(() => {
		const body = document.body;
		if (body) {
			if (theme === "dark") {
				body.classList.add("dark");
				localStorage.setItem("theme", "dark");
			} else {
				body.classList.remove("dark");
				localStorage.setItem("theme", "light");
			}
		}
  }, [theme]);

  return [theme, handleSwitchChange] as const;
}