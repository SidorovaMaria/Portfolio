import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch } from "react-redux";
import { deleteBoard } from "../redux/boardsSlice";
const DeleteBoardModal = ({ board, close, modal }) => {
	const dispatch = useDispatch();
	const handleDelete = () => {
		dispatch(deleteBoard(board.id));
		close(false);
	};
	return (
		<AnimatePresence mode="wait">
			{modal && (
				<motion.aside
					key="deleteModal"
					initial="hidden"
					animate="show"
					exit="exit"
					transition={{
						type: "spring",
						duration: 0.2,
					}}
					onClick={() => close(false)}
					variants={backdropVariant}
					className="inset-0 absolute w-screen h-screen z-40 bg-black/50 px-4 flex items-center gap-6"
				>
					<motion.div
						variants={modalBlock}
						className="bg-white dark:bg-dark-grey w-full p-6 rounded-[6px] flex flex-col gap-4"
					>
						<h3 className="text-l leading-l text-red">Delete this board?</h3>
						<p className="text-body-l leading-body-l font-medium text-medium-grey">
							Are you sure you want to delete the ‘{board.name}’ board? This action
							will remove all columns and tasks and cannot be reversed.
						</p>
						<button
							className="bg-red text-white w-full rounded-[20px] py-2 text-body-l leading-body-l "
							onClick={handleDelete}
						>
							Delete
						</button>
						<button
							className="bg-purple/10 dark:bg-white text-purple w-full rounded-[20px] py-2 text-body-l leading-body-l "
							onClick={() => close(false)}
						>
							Cancel
						</button>
					</motion.div>
				</motion.aside>
			)}
		</AnimatePresence>
	);
};

export default DeleteBoardModal;
const backdropVariant = {
	hidden: {
		opacity: 0,
	},
	show: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
};
const modalBlock = {
	hidden: {
		scaleY: 0,
		scaleX: 2,
	},
	show: {
		scaleY: 1,
		scaleX: 1,
		transition: {
			type: "spring",
			duration: 1,
		},
	},
	exit: {
		scaleY: 0,
		scaleX: 2,
		transition: {
			type: "spring",
			duration: 0.5,
		},
	},
};
