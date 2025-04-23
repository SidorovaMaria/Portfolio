import React from "react";
import { motion } from "motion/react";
import { useDispatch } from "react-redux";
import { deleteBoard, deleteTask } from "../../redux/boardsSlice";
const DeleteModal = ({ mode, component, close }) => {
	const dispatch = useDispatch();
	const handleDelete = () => {
		if (mode === "board") {
			dispatch(deleteBoard(component.id));
		} else {
			dispatch(deleteTask({ taskId: component.id }));
		}
		close();
	};
	return (
		<motion.aside
			key="delteModal"
			initial="hidden"
			animate="show"
			exit="exit"
			variants={backdropVariant}
			transition={{
				duration: 0.7,
			}}
			onClick={() => close()}
			className="inset-0 fixed z-30 w-screen h-screen bg-black/50 px-4 flex items-center gap-6
                           "
		>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				variants={modalBlock}
				transition={{ delay: 0.5 }}
				className="bg-white dark:bg-dark-grey w-full p-6 md:p-8 rounded-[6px] flex flex-col gap-6  max-w-[480px] mx-auto"
			>
				<h3 className="text-l leading-l text-red">
					Delete this {mode === "board" ? "board" : "task"}?
				</h3>
				<p className="text-body-l leading-body-l font-medium text-medium-grey">
					{mode === "board" ? (
						<>
							Are you sure you want to delete the ‘
							<span className=" brightness-50 dark:brightness-150">
								{component.name}
							</span>
							’ board? This action will remove all columns and tasks and cannot be
							reversed.
						</>
					) : (
						<>
							Are you sure you want to delete the ‘
							<span className=" brightness-50 dark:brightness-150">
								{component.title}
							</span>
							’ task and its subtasks? This action cannot be reversed.
						</>
					)}
				</p>
				<div className="flex flex-col gap-4 w-full md:flex-row">
					<button
						aria-label={`Delete ${mode}`}
						type="button"
						className="bg-red text-white w-full rounded-[20px] py-2 text-body-l leading-body-l hover:bg-red-hover cursor-pointer"
						onClick={handleDelete}
					>
						Delete
					</button>
					<button
						aria-label={`Cancel`}
						className="bg-purple/10 dark:bg-white text-purple w-full rounded-[20px] py-2 text-body-l leading-body-l cursor-pointer not-dark:hover:bg-[#635FC7]/25"
						onClick={close}
						type="button"
					>
						Cancel
					</button>
				</div>
			</motion.div>
		</motion.aside>
	);
};

export default DeleteModal;

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
