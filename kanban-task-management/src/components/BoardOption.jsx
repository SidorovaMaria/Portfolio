import React from "react";
import { motion } from "motion/react";
import { ReactSVG } from "react-svg";
import { useDispatch } from "react-redux";
import { setActiveBoard } from "../redux/boardsSlice";
const BoardOption = ({ active, close, board, variant }) => {
	const dispatch = useDispatch();
	const changeBoard = () => {
		dispatch(setActiveBoard(board.id));
		close?.(false);
	};
	return (
		<motion.li
			variants={variant}
			className={`flex items-center gap-3 pl-6 rounded-r-full py-4 cursor-pointer ${
				active ? "bg-purple" : "hover:bg-purple/10 dark:group-hover:bg-white"
			} group`}
			onClick={changeBoard}
		>
			<motion.span variants={""}>
				<ReactSVG
					src="/assets/icon-board.svg"
					className={`fill-medium-grey ${active ? "fill-white" : "group-hover:fill-purple "}`}
				/>
			</motion.span>
			<h2
				className={`${
					active ? "text-white" : "text-medium-grey group-hover:text-purple "
				} text-m leading-m whitespace-nowrap`}
			>
				{board.name}
			</h2>
		</motion.li>
	);
};

export default BoardOption;
