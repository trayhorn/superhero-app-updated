import { lazy } from "react";
import { useParams } from "react-router-dom";
import { getHeroByIdRequest } from "../api";
import { SuperheroDetails, Loader } from "../components/index";
import { useQuery } from "@tanstack/react-query";
const ErrorMessage = lazy(() => import("../components/ErrorMessage"));

export default function SuperheroDetailsPage() {
	const { id } = useParams();


	const {isPending, isError, data: heroData} = useQuery({
		queryKey: ["superheroDetails", id],
		queryFn: () => {
			if (!id) throw new Error();
			const data = getHeroByIdRequest(id);
			return data;
		},
	});

	return (
		<>
			{isError ? (
				<ErrorMessage />
			) : isPending ? (
				<Loader />
			) : (
				<SuperheroDetails
					heroDetails={heroData.data}
				/>
			)}
		</>
	);
}
