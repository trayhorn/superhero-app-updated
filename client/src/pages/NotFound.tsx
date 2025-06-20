import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
			<h1 className="text-center text-[10rem]!">404</h1>
			<h2 className="text-center text-4xl mb-3!">Page Not Found</h2>
			<Link
				className="text-header-bg! dark:text-dark-header-bg"
				to="/superheroes"
			>
				Back to homepage
			</Link>
		</div>
	);
}
