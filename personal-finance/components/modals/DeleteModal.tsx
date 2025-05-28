import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { modalContentVariant, ModalOverlayVariant } from "../constants/motionVariants";
import { PotType } from "@/lib/features/financeSlice";
import IconCloseModal from "../svg/IconCloseModal";
import { useDispatch } from "react-redux";
interface DeleteModalProps {
	close: () => void;
	pot: PotType;
	mode: string;
	open: boolean;
}
const DeleteModal = ({ close, pot, mode, open }: DeleteModalProps) => {
	const dispatch = useDispatch();
	const handleDelete = () => {
		if (mode === "pot") {
			dispatch({
				type: "finance/deletePot",
				payload: pot.id,
			});
		}
		close();
	};
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
							<h2 className="text-2 leading-120 font-bold">
								Delete &apos;{mode === "pot" ? pot.name : "Transaction"}&apos; ?
							</h2>
							<IconCloseModal
								className="cursor-pointer w-8 h-8 fill-grey-500 hover:fill-red-400 transition-colors duration-300"
								onClick={close}
							/>
						</div>
						<p className="text-4 w-full text-grey-500 leading-150">
							{mode == "pot"
								? "Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
								: "Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."}
						</p>
						<button
							onClick={handleDelete}
							className="btn btn-destroy w-full text-4 font-bold leading-150"
						>
							Yes, Confirm Deletionm
						</button>
						<button
							className="btn btn-tertiary w-full text-4 p-0 font-normal"
							onClick={close}
						>
							No, Go Back
						</button>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default DeleteModal;
