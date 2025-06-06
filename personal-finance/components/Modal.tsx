import { AnimatePresence, motion } from "motion/react";
import { modalContentVariant, ModalOverlayVariant } from "./constants/motionVariants";
import IconCloseModal from "./svg/IconCloseModal";
interface ModalProps {
	open: boolean;
	close: () => void;
	children: React.ReactNode;
	title: string;
}
const Modal = ({ open, close, children, title }: ModalProps) => {
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
						<div className="flex w-full items-center justify-between ">
							<h2 className="text-h2-h1">{title}</h2>
							<IconCloseModal
								className="cursor-pointer w-8 h-8 fill-muted hover:fill-red-400 transition-colors duration-300"
								onClick={close}
							/>
						</div>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Modal;
