import { useModal } from "../../hooks/useModal";
import type { superHero } from "../../types/types";
import styles from "./HeroCard.module.css";
import { MdDelete } from "react-icons/md";
import { deleteHeroRequest } from "../../api";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../api";
import Tooltip from "@mui/material/Tooltip";
import { Grow } from "@mui/material";
import ModalComponent from "../ModalComponent/ModalComponent";

type HeroCard = {
	heroData: superHero;
	onDelete: (id: string) => void;
};

export default function HeroCard({ heroData, onDelete }: HeroCard) {
	const { isModalOpen, openModal, closeModal } = useModal();

	const handleDeleteHero = async (e: React.MouseEvent, id: string | undefined) => {
		e.preventDefault();
		e.stopPropagation();

		if (id) {
			await deleteHeroRequest(id);
			onDelete(id);
		}
	};

	const {
		_id,
		nickname,
		images
	} = heroData;

	const heroAvatarSrc =
		images.length > 0 ? `${BASE_URL}/${images[0]}` : "/images/no-image.jpg";

	return (
		<li className={styles.heroCard}>
			<Link className={styles.link} to={`${_id}`}>
				<div className={styles.imageWrapper}>
					<img className={styles.image} src={heroAvatarSrc} alt="" />
				</div>
				<h3 className={styles.nickname}>{nickname}</h3>
			</Link>

			<Tooltip
				title="Delete"
				slots={{
					transition: Grow,
				}}
				slotProps={{
					transition: { timeout: 300 },
				}}
			>
				<MdDelete
					className={styles.deleteIcon}
					onClick={(e: React.MouseEvent) => {
						e.preventDefault();
						e.stopPropagation();
						openModal();
					}}
				/>
			</Tooltip>

			<ModalComponent isModalOpen={isModalOpen} closeModal={closeModal}>
				<div className={styles.modalContent}>
					<h2 className={styles.modalTitle}>
						Are you sure you want to delete this hero?
					</h2>
					<div className={styles.modalButtons}>
						<button
							className={styles.deleteButton}
							onClick={(e) => handleDeleteHero(e, _id)}
						>
							Delete
						</button>
						<button className={styles.cancelButton} onClick={closeModal}>
							Cancel
						</button>
					</div>
				</div>
			</ModalComponent>
		</li>
	);
}