import { Outlet } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";

export default function Header() {
	return (
		<>
			<header className="text-center bg-header-bg dark:bg-dark-header-bg text-header-text p-md font-montserrat font-bold">
				<h1>Superheroes</h1>
				<ThemeSwitch />
			</header>
			<Outlet />
		</>
	);
}
