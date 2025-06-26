import { Routes, Route, Navigate } from "react-router-dom";
import SuperheroesPage from "./pages/SuperheroesPage";
import SuperheroDetailsPage from "./pages/SuperheroDetailsPage";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";

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