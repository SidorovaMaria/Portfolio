import { AnimatePresence, motion } from "motion/react";
import { modalContentVariant, ModalOverlayVariant } from "./constants/motionVariants";
interface ModalProps {
	open: boolean;
	close: () => void;
	children: React.ReactNode;
}
const Modal = ({ open, close, children }: ModalProps) => {
	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={"initial"}
					animate={"show"}
					exit={"exit"}
					onClick={close}
					variants={ModalOverlayVariant}
					className="modal-overlay px-5 z-50"
				>
					<motion.div
						onClick={(e) => e.stopPropagation()}
						variants={modalContentVariant}
						className="modal-content w-full max-w-[560px] origin-top "
					>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
