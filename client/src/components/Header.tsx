import { Outlet } from "react-router-dom";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Header() {
	const handleSwitchChange = () => {
		const body = document.querySelector("body");
		body?.classList.toggle("dark");
	};

	return (
		<>
			<header className="text-center bg-secondary-bg dark:bg-dark-secondary-bg p-md">
				<h1>Superheroes</h1>
				<FormControlLabel
					style={{ position: "absolute", right: "20px", top: "25px" }}
					control={
						<Switch
							color="secondary"
							onChange={handleSwitchChange}
						/>
					}
					label="Theme"
				/>
			</header>
			<Outlet />
		</>
	);
}
