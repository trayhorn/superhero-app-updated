import type { superHero } from "../../types/types";
import styles from "./HeroCard.module.css";
import { MdDelete } from "react-icons/md";
import { deleteHeroRequest } from "../../api";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../api";

type HeroCard = {
	heroData: superHero;
	onDelete: (id: string) => void;
};

export default function HeroCard({ heroData, onDelete }: HeroCard) {

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

	return (
		<li className={styles.heroCard}>
			<Link className={styles.link} to={`${_id}`}>
				<div className={styles.imageWrapper}>
					<img
						className={styles.image}
						src={BASE_URL + "/" + images[0]}
						alt=""
					/>
				</div>
				<h3 className={styles.nickname}>{nickname}</h3>

				<MdDelete
					className={styles.deleteIcon}
					onClick={(e) => handleDeleteHero(e, _id)}
				/>
			</Link>
		</li>
	);
}