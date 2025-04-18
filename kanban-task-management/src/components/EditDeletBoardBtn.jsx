import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import DeleteBoardModal from "./DeleteBoardModal";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import AddEditBoardModal from "./AddEditBoardModal";

const EditDeletBoardBtn = () => {
	const { activeBoard } = useSelector((state) => state.boards);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const [editModalOpen, setEditModalOpen] = useState(false);

	const settingsRef = useRef();
	const [deleteEditBoardOpen, setdeleteEditBoardOpen] = useState(false);
	const closeEditAddModal = () => {
		setEditModalOpen(false);
	};
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (settingsRef.current && !settingsRef.current.contains(e.target)) {
				setdeleteEditBoardOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<>
			<motion.div
				ref={settingsRef}
				animate={deleteEditBoardOpen ? "openSetting" : "closeSetting"}
			>
				<button className="flex items-center justify-center h-4 cursor-pointer">
					<ReactSVG
						src="/assets/icon-vertical-ellipsis.svg"
						onClick={() => setdeleteEditBoardOpen((prev) => !prev)}
					/>
				</button>
				<motion.div
					className="absolute top-[100%] right-[2%] flex flex-col gap-1 cursor-pointer"
					variants={{
						openSetting: {
							y: 0,
							scaleY: 1,
							opacity: 1,
						},
						closeSetting: {
							y: -50,
							scaleY: 0,
							opacity: 0,
						},
					}}
					transition={{
						type: "spring",
						duration: 0.5,
					}}
				>
					<motion.button
						className="bg-white dark:bg-dark-grey text-s leading-m text-dark-grey/80 dark:text-white/80 hover:bg-purple hover:text-white py-2 px-4 w-full text-left shadow-[2px_2px_2px_2px] border shadow-dark-grey/50 rounded-sm hover:shadow-none"
						onClick={() => {
							setEditModalOpen(true);
							setdeleteEditBoardOpen(false);
						}}
					>
						Edit Board
					</motion.button>
					<motion.button
						onClick={() => {
							setDeleteModalOpen(true);
							setdeleteEditBoardOpen(false);
						}}
						className=" bg-white dark:bg-dark-grey text-s leading-m text-red hover:bg-red hover:text-white py-2 px-4 w-full text-left shadow-[2px_2px_2px_2px] border shadow-red/50 rounded-sm hover:shadow-none"
					>
						Delete Board
					</motion.button>
				</motion.div>
			</motion.div>
			<DeleteBoardModal
				close={setDeleteModalOpen}
				board={activeBoard}
				modal={deleteModalOpen}
			/>
			<AddEditBoardModal
				modal={editModalOpen}
				board={activeBoard}
				mode={"edit"}
				close={closeEditAddModal}
			/>
		</>
	);
};

export default EditDeletBoardBtn;
