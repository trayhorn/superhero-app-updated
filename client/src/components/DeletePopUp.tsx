import { deleteHeroRequest } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type PopUpProps = {
	closeModal: () => void;
	id: string | undefined;
};

export default function DeletePopUp({ closeModal, id }: PopUpProps) {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (id: string) => deleteHeroRequest(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["superheroes"] })
		},
	});

	if (!id) return;

	return (
		<div className="flex flex-col gap-4">
			<h2>Are you sure you want to delete this hero?</h2>
			<div className="flex justify-center gap-4">
				<button
					className="popUpButton"
					onClick={() => mutation.mutate(id)}
				>
					Delete
				</button>
				<button className="popUpButton" onClick={closeModal}>
					Cancel
				</button>
			</div>
		</div>
	);
}