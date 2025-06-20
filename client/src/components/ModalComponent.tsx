import { IoMdClose } from "react-icons/io";
import Modal from "@mui/material/Modal";
import Box from '@mui/material/Box';


const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	// border: "3px solid #FFA500",
	transform: "translate(-50%, -50%)",
	padding: "30px 20px",
	backgroundColor: "var(--color-gallery-bg)",
	overflow: "auto",
	maxHeight: "80%",
};

type ModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export default function ModalComponent({ isModalOpen, closeModal, children }: ModalProps) {
	return (
		<Modal
			open={isModalOpen}
			onClose={closeModal}
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			<Box sx={style}>
				{children}
				<div className="modalButtonWrapper">
					<IoMdClose className="modalButton" onClick={closeModal} />
				</div>
			</Box>
		</Modal>
	);
}