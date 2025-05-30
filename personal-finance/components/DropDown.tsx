import React from "react";
import IconCaretLeft from "./svg/IconCaretLeft";
import { AnimatePresence, motion } from "motion/react";
import { selectDropDownVariant } from "./constants/motionVariants";

interface DropdownProps {
	minWidth: string;
	label: string;
	options: string[];
	selected: string;
	setSelected: (val: string) => void;
	open: boolean;
	setOpen: (val: boolean) => void;
}
const DropDown = ({
	label,
	options,
	selected,
	setSelected,
	open,
	setOpen,
	minWidth,
}: DropdownProps) => {
	return (
		<div className=" items-center hidden md:flex gap-2 ">
			<p className="text-4 leading-150 text-grey-500">{label}</p>
			<div className={`relative ${minWidth} `}>
				<div
					className="relative flex items-center gap-4 py-3 px-5 border rounded-8"
					onClick={() => setOpen(!open)}
				>
					<p className="text-5 leading-150 flex-1">{selected}</p>
					<IconCaretLeft
						className={`w-4 h-4 -rotate-90 fill-grey-900
                                    duration-200 ${open && "rotate-90! "} `}
					/>
				</div>
				<AnimatePresence>
					{open && (
						<motion.ul
							initial="hidden"
							animate="show"
							exit="exit"
							variants={selectDropDownVariant}
							transition={{ duration: 0.3 }}
							className="absolute top-full right-0 mt-3 rounded-8 bg-white shadow-[0px_4px_24px] shadow-black/25 z-50 flex flex-col w-full"
						>
							{options.map((option) => (
								<motion.li
									key={option}
									className={`text-4 leading-150 cursor-pointer px-5 rounded-8 w-full py-2 ${
										option === selected
											? "font-bold bg-secondary-green text-white"
											: "hover:bg-secondary-green/50 hover:text-white"
									}`}
									onClick={() => {
										setSelected(option);
										setOpen(false);
									}}
								>
									{option}
								</motion.li>
							))}
						</motion.ul>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default DropDown;
