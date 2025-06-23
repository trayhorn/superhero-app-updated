import { IoMdClose } from "react-icons/io";
import { Dialog } from "@base-ui-components/react/dialog";


type ModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export default function ModalComponent({ isModalOpen, closeModal, children }: ModalProps) {
	return (
		<Dialog.Root
			open={isModalOpen}
			onOpenChange={(isOpen) => {
				if (!isOpen) closeModal();
			}}
		>
			<Dialog.Portal>
				<Dialog.Backdrop
					onClick={closeModal}
					className="fixed inset-0 bg-black opacity-20 transition-all duration-150 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 dark:opacity-70"
				/>
				<Dialog.Popup className="fixed top-1/2 left-1/2 w-fit max-h-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-50 p-6   transition-all duration-150 data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[starting-style]:scale-90 data-[starting-style]:opacity-0 dark:outline-gray-300 overflow-auto">
					{children}
					<div className="flex justify-end gap-4">
						<Dialog.Close>
							<IoMdClose className="absolute top-[5px] right-[5px] w-6 h-6 transition-colors duration-150 ease-in-out" />
						</Dialog.Close>
					</div>
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
}