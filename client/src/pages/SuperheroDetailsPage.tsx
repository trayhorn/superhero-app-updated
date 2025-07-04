import { useEffect, useState, lazy } from "react";
import { useParams } from "react-router-dom";
import { getHeroByIdRequest } from "../api";
import type { superHero } from "../types/types";
import {SuperheroDetails, Loader} from "../components/index";
const ErrorMessage = lazy(() => import("../components/ErrorMessage"));

export default function SuperheroDetailsPage() {
	const { id } = useParams();
	const [heroDetails, setHeroDetails] = useState<superHero | null>(null);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const getUpdatedHeroDetails = (updatedHeroDetails: superHero) => {
		setHeroDetails(updatedHeroDetails);
	};

	useEffect(() => {
		const handleGetHeroById = async (id: string) => {
			try {
				setLoading(true);
				setError(false);

				const { data } = await getHeroByIdRequest(id);
				setHeroDetails(data);
			} catch (error) {
				console.error("Error fetching superhero details:", error);
				setError(true);
				setLoading(false);
			} finally {
				setLoading(false);
			}
		};

		if (id) handleGetHeroById(id);
	}, [id]);

	return (
		<>
			{error ? (
				<ErrorMessage />
			) : loading ? (
				<Loader />
			) : (
				<SuperheroDetails
					heroDetails={heroDetails}
					getUpdatedHeroDetails={getUpdatedHeroDetails}
				/>
			)}
		</>
	);
}
