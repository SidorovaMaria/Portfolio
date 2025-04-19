import React from "react";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import EditDeletBoardBtn from "../components/EditDeletBoardBtn";
import { AnimatePresence } from "motion/react";

const DesktopHeader = () => {
	const { activeBoard } = useSelector((state) => state.boards);

	return (
		<AnimatePresence>
			<header className="hidden md:flex items-center h-20 border-b border-b-light-lines dark:border-b-dark-lines justify-between bg-white dark:bg-dark-grey">
				<div className="flex items-center gap-6 h-full">
					<div
						className={`min-w-[260px] h-20 flex items-center border-r border-light-lines dark:border-dark-lines`}
					>
						<div className="pl-6">
							<ReactSVG src="/assets/logo-light.svg" className="hidden dark:block" />
							<ReactSVG src="/assets/logo-dark.svg" className="dark:hidden" />
						</div>
					</div>

					<h1 className="text-[20px] leading-[25px] ">
						{activeBoard ? activeBoard.name : ""}
					</h1>
				</div>
				{activeBoard && (
					<div className="pr-6 flex items-center gap-6">
						<button className="bg-purple text-white rounded-[24px] py-3.5 px-6 text-m leading-m not-dark:hover:bg-purple-hover cursor-pointer ">
							+ Add New Task
						</button>
						<EditDeletBoardBtn />
					</div>
				)}
			</header>
		</AnimatePresence>
	);
};

export default DesktopHeader;
