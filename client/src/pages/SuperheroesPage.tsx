import { useRef, lazy } from "react";
import { useModal } from "../hooks/useModal";
import {HeroGallery, CreateHeroBtn, Loader} from "../components/index";
import { getAllHerousRequest } from "../api";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
const AddHeroForm = lazy(() => import("../components/AddHeroForm"));
const ErrorMessage = lazy(() => import("../components/ErrorMessage"));
const EmptyGallery = lazy(() => import("../components/EmptyGallery"));
const ModalComponent = lazy(() => import("../components/ModalComponent"));

export default function SuperheroesPage() {
	const { isModalOpen, openModal, closeModal } = useModal();
	const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

	const queryClient = useQueryClient();

	const { data, fetchNextPage, isPending, isError, hasNextPage } =
		useInfiniteQuery({
			queryKey: ["superheroes"],
			queryFn: ({ pageParam }) => getAllHerousRequest(pageParam),
			initialPageParam: 1,
			getNextPageParam: (lastPage, _, lastPageParam) =>
				lastPage.data.totalPages !== lastPageParam ? lastPageParam + 1 : null,
		});

	const refetchAllHeroes = () => {
		queryClient.invalidateQueries({ queryKey: ["superheroes"] });
	};

	if (data?.pages[0].data.superheroes.length === 0 && !isPending && !isError) {
		return (
			<>
				<CreateHeroBtn openModal={openModal} />
				<EmptyGallery />
				<ModalComponent isModalOpen={isModalOpen} closeModal={closeModal}>
					<AddHeroForm
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
					<HeroGallery data={data} onDelete={refetchAllHeroes} />
					{hasNextPage && (
						<button
							className="homePageButton"
							ref={loadMoreButtonRef}
							onClick={() => fetchNextPage()}
						>
							Load more
						</button>
					)}
					<ModalComponent isModalOpen={isModalOpen} closeModal={closeModal}>
						<AddHeroForm
							handleHeroesUpdate={refetchAllHeroes}
							closeModal={closeModal}
						/>
					</ModalComponent>
				</>
			)}
		</>
	);
}