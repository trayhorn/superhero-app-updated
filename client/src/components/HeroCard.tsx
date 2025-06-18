import { useModal } from "../hooks/useModal";
import type { superHero } from "../types/types";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { BASE_URL } from "../api";
import Tooltip from "@mui/material/Tooltip";
import { Grow } from "@mui/material";
import ModalComponent from "./ModalComponent";
import DeletePopUp from "./DeletePopUp";

type HeroCard = {
	heroData: superHero;
	onDelete: (id: string) => void;
};

export default function HeroCard({ heroData, onDelete }: HeroCard) {
	const { isModalOpen, openModal, closeModal } = useModal();
	const { _id, nickname, images } = heroData;

	const heroAvatarSrc =
		images.length > 0 ? `${BASE_URL}/${images[0]}` : "/images/no-image.jpg";

	return (
		<li className="group font-montserrat relative list-none p-sm bg-primary-dark  border-2 border-border-color rounded-sm text-third cursor-pointer dark:bg-dark-primary-dark dark:border-dark-border-color dark:text-dark-third">
			<Link
				className="flex flex-col justify-between w-full h-full"
				to={`${_id}`}
			>
				<div className="flex-1">
					<img
						className="block w-full h-full object-cover"
						src={heroAvatarSrc}
						alt=""
					/>
				</div>
				<h3 className="mt-2 text-center">{nickname}</h3>
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
					className="absolute top-[10px] right-[10px] w-6 h-6 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 ease-in-out"
					onClick={(e: React.MouseEvent) => {
						e.preventDefault();
						e.stopPropagation();
						openModal();
					}}
				/>
			</Tooltip>

			<ModalComponent isModalOpen={isModalOpen} closeModal={closeModal}>
				<DeletePopUp closeModal={closeModal} onDelete={onDelete} id={_id} />
			</ModalComponent>
		</li>
	);
}
