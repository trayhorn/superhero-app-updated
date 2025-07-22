import { useState, useRef, lazy } from "react";
import { useModal } from "../hooks/useModal";
import {HeroGallery, CreateHeroBtn, Loader} from "../components/index";
import { getAllHerousRequest } from "../api";
import {
	keepPreviousData,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
const AddHeroForm = lazy(() => import("../components/AddHeroForm"));
const ErrorMessage = lazy(() => import("../components/ErrorMessage"));
const EmptyGallery = lazy(() => import("../components/EmptyGallery"));
const ModalComponent = lazy(() => import("../components/ModalComponent"));

export default function SuperheroesPage() {
	const [page, setPage] = useState<number>(1);

	const [isLastPage, setIsLastPage] = useState(false);

	const queryClient = useQueryClient();

	const { isError, isPending, data } = useQuery({
		queryKey: ["superheroes", page],
		queryFn: () => getAllHerousRequest(page),
		placeholderData: keepPreviousData,
	});

	console.log(data?.data.superheroes);

	const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

	const { isModalOpen, openModal, closeModal } = useModal();

	const refetchAllHeroes = () => {
		queryClient.invalidateQueries({ queryKey: ["superheroes", page] });
	};

	if (data?.data.superheroes.length === 0 && !isPending && !isError) {
		return (
			<>
				<CreateHeroBtn openModal={openModal} />
				<EmptyGallery />
				<ModalComponent isModalOpen={isModalOpen} closeModal={closeModal}>
					<AddHeroForm
						lastPageCheck={() => setIsLastPage(false)}
						handleHeroesUpdate={refetchAllHeroes}
						closeModal={closeModal}
					/>
				</ModalComponent>
			</>
		);
	}

	return (
		<>
			{isError ? (
				<ErrorMessage />
			) : isPending ? (
				<Loader />
			) : (
				<>
					<CreateHeroBtn openModal={openModal} />
					<HeroGallery
						heroes={data?.data.superheroes}
						onDelete={refetchAllHeroes}
					/>
					{!isLastPage && (
						<button
							className="homePageButton"
							ref={loadMoreButtonRef}
							onClick={() => setPage((prev) => prev + 1)}
							disabled={isPending}
						>
							{isPending ? "Loading..." : "Load more"}
						</button>
					)}
					<ModalComponent isModalOpen={isModalOpen} closeModal={closeModal}>
						<AddHeroForm
							handleHeroesUpdate={refetchAllHeroes}
							lastPageCheck={() => setIsLastPage(false)}
							closeModal={closeModal}
						/>
					</ModalComponent>
				</>
			)}
		</>
	);
}