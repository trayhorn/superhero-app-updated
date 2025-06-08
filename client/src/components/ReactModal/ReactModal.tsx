import Modal from "react-modal";
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

type ReactModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export default function ReactModal({ isModalOpen, closeModal, children }: ReactModalProps) {
	return (
		<Modal style={modalStyles} isOpen={isModalOpen} onRequestClose={closeModal}>
			{children}
			<div className="modalButtonWrapper">
				<IoMdClose className="modalButton" onClick={closeModal} />
			</div>
		</Modal>
	);
}