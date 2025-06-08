import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import SuperheroDetailsPage from "./pages/SuperheroDetails/SuperheroDetailsPage";
import Header from "./components/Header/Header";
import NotFound from "./pages/NotFound/NotFound";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/superheroes" replace />} />
			<Route path="/superheroes" element={<Header />}>
				<Route index element={<GalleryPage />} />
				<Route path=":id" element={<SuperheroDetailsPage />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
