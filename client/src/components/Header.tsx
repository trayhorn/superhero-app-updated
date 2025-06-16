import { Outlet } from 'react-router-dom';

export default function Header() {
	return (
		<>
			<header className="text-center bg-amber-300 p-6">
				<h1>Superheroes</h1>
			</header>
			<Outlet />
		</>
	);
}