import { useCallback, useEffect, useState } from "react";
import HeroGallery from "../../components/HeroGallery/HeroGallery";
import AddHeroForm from "../../components/AddHeroForm/AddHeroForm";
import type { superHero } from "../../types/types";
import { getAllHerousRequest } from "../../api";
import Modal from "react-modal";
import CreateHeroBtn from "../../components/CreateHeroBtn/CreateHeroBtn";
import { useRef } from "react";
import styles from "./GalleryPage.module.css";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { IoMdClose } from "react-icons/io";

Modal.setAppElement("#root");

const modalStyles = {
	content: {
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		padding: "30px 20px",
		height: "80%",
	},
};

export default function GalleryPage() {
	const [heroes, setHeroes] = useState<superHero[]>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [page, setPage] = useState<number>(1);

	const [loadingInitial, setLoadingInitial] = useState(true);
	const [error, setError] = useState(false);
	const [loadingMore, setLoadingMore] = useState(false);
	const [isLastPage, setIsLastPage] = useState(false);

	const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

	const handleHeroAdd = useCallback((newHero: superHero) => {
		setHeroes((prev) => [...prev, newHero]);
	}, []);

	const handleHeroDelete = useCallback((id: string) => {
		setHeroes((prev) => prev.filter((hero) => hero._id !== id));
	}, []);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		const fetchAllHeroes = async () => {
			try {
				if (page === 1) {
					setLoadingInitial(true);
				} else {
					setLoadingMore(true);
				}
				setError(false);

				const { data } = await getAllHerousRequest(page);

				setHeroes((prev) =>
					page === 1 ? data.superheroes : [...prev, ...data.superheroes]
				);

				setIsLastPage(data.totalPages === page);
			} catch (error) {
				console.error("Error fetching heroes:", error);
				setError(true);
			} finally {
				setLoadingInitial(false);
				setLoadingMore(false);
			}
		};

		fetchAllHeroes();
	}, [page]);

	return (
		<>
			{error ? (
				<ErrorMessage message="Something went wrong. Please try again." />
			) : loadingInitial ? (
				<Loader />
			) : (
				<>
					<CreateHeroBtn openModal={openModal} />
					<HeroGallery heroes={heroes} onDelete={handleHeroDelete} />
					{!isLastPage && (
						<button
							className={styles.loadMoreButton}
							ref={loadMoreButtonRef}
							onClick={() => setPage((prev) => prev + 1)}
							disabled={loadingMore}
						>
							{loadingMore ? "Loading..." : "Load more"}
						</button>
					)}

					<Modal
						style={modalStyles}
						isOpen={isModalOpen}
						onRequestClose={closeModal}
					>
						<AddHeroForm
							handleHeroAdd={handleHeroAdd}
							closeModal={closeModal}
						/>
						<div className="modalButtonWrapper">
							<IoMdClose className="modalButton" onClick={closeModal} />
						</div>
					</Modal>
				</>
			)}
		</>
	);
}