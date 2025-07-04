import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import Header from "./components/Header";

const SuperheroesPage = lazy(() => import("./pages/SuperheroesPage"));
const SuperheroDetailsPage = lazy(() => import("./pages/SuperheroDetailsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/superheroes" replace />} />
			<Route path="/superheroes" element={<Header />}>
				<Route index element={<SuperheroesPage />} />
				<Route path=":id" element={<SuperheroDetailsPage />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;