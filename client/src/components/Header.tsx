import { Outlet } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
	return (
		<>
			<header className="text-center bg-secondary-bg dark:bg-dark-secondary-bg p-md">
				<h1>Superheroes</h1>
				<ThemeSwitch />
			</header>
			<Outlet />
		</>
	);
}
