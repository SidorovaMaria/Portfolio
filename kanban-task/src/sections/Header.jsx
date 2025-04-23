import React, { useState } from "react";
import { useSelector } from "react-redux";
import MobileDropDown from "../components/MobileDropDown";
import { AnimatePresence, motion } from "motion/react";
import { ReactSVG } from "react-svg";
import SettingsToggle from "../components/SettingsToggle";

const Header = ({ openModal, openTaskModal }) => {
	const { boards, activeBoard } = useSelector((state) => state.boards);

	return (
		<header className="flex h-16 py-5 px-4  bg-white dark:bg-dark-grey md:p-0 md:h-20  lg:h-25 items-center border-b md:sticky md:top-0 z-30">
			<div className="w-fit flex items-center h-full md:w-[280px] lg:w-[300px] md:border-r md:border-light-lines dark:border-dark-lines md:pl-6">
				{/* Logo */}

				<img src="./assets/logo-mobile.svg" className="md:hidden" alt="Logo" />
				<img src="/assets/logo-light.svg" className="hidden md:dark:block" alt="Logo" />
				<img src="/assets/logo-dark.svg" className="hidden md:not-dark:block" alt="Logo" />
			</div>
			{/* ToggleMode */}
			<div className="flex-1 flex justify-between items-center h-full md:px-6 ">
				{/* Mobile DropDown */}
				<MobileDropDown activeBoard={activeBoard} openCreateNew={openModal} />
				<h1 className="hidden md:block text-[20px] leading-[25px]">{activeBoard?.name}</h1>
				{activeBoard && (
					<div className="flex gap-4 md:gap-6 items-center ">
						<button
							aria-label="Add New Task"
							className="bg-purple px-4.5 py-2.5 rounded-full hover:bg-purple-hover group cursor-pointer text-white "
							onClick={() => {
								openTaskModal("add");
							}}
						>
							<ReactSVG
								src="/assets/icon-add-task-mobile.svg"
								className="fill-white md:hidden "
							/>
							<h2 className="hidden md:block text-m lading-m">+ Add New Task</h2>
						</button>
						<SettingsToggle
							open={openModal}
							component={activeBoard}
							mode="board"
							className={"top-[68px] md:top-[84px] lg:top-[104px] right-[1%] "}
						/>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
