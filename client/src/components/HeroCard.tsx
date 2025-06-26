import { useModal } from "../hooks/useModal";
import type { superHero } from "../types/types";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import ModalComponent from "./ModalComponent";
import DeletePopUp from "./DeletePopUp";

type HeroCard = {
	heroData: superHero;
	onDelete: (id: string) => void;
};

export default function HeroCard({ heroData, onDelete }: HeroCard) {
	const { isModalOpen, openModal, closeModal } = useModal();
	const { _id, nickname, thumbnail } = heroData;

	const heroAvatarSrc =
		thumbnail ? thumbnail : "/images/no-image.jpg";

	return (
		<li className="group font-montserrat relative list-none p-sm bg-card-bg rounded-sm text-text-primary cursor-pointer dark:bg-dark-card-bg dark:border-dark-border-color dark:text-dark-text-primary font-medium [box-shadow:0_4px_10px_rgba(43,45,66,0.1)]">
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
			<MdDelete
				className="absolute top-[10px] right-[10px] w-6 h-6 cursor-pointer opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 ease-in-out text-white"
				onClick={(e: React.MouseEvent) => {
					e.preventDefault();
					e.stopPropagation();
					openModal();
				}}
			/>
			<ModalComponent isModalOpen={isModalOpen} closeModal={closeModal}>
				<DeletePopUp closeModal={closeModal} onDelete={onDelete} id={_id} />
			</ModalComponent>
		</li>
	);
}