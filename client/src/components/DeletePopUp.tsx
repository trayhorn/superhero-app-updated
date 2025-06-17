import { deleteHeroRequest } from '../api';

type PopUpProps = {
	closeModal: () => void;
  onDelete: (id: string) => void;
  id: string | undefined;
};

export default function DeletePopUp({ closeModal, onDelete, id }: PopUpProps) {
	const handleDeleteHero = async (
		e: React.MouseEvent,
		id: string | undefined
	) => {
		e.preventDefault();
		e.stopPropagation();

		if (id) {
			await deleteHeroRequest(id);
			onDelete(id);
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<h2>Are you sure you want to delete this hero?</h2>
			<div className="flex justify-center gap-4">
				<button
					className="px-4 py-2 bg-amber-400 rounded-[5px]"
					onClick={(e) => handleDeleteHero(e, id)}
				>
					Delete
				</button>
				<button
					className="px-4 py-2 bg-amber-400 rounded-[5px]"
					onClick={closeModal}
				>
					Cancel
				</button>
			</div>
		</div>
	);
}