import React, { useRef } from "react";
import IconCaretLeft from "./svg/IconCaretLeft";
import { AnimatePresence, motion } from "motion/react";
import { selectDropDownVariant } from "./constants/motionVariants";
import { useClickOutside } from "@/lib/useClickOutside";

interface DropdownProps {
	icon?: React.ReactNode;
	minWidth?: string;
	label: string;
	options: string[];
	selected: string;
	setSelected: (val: string) => void;
	open: boolean;
	setOpen: (val: boolean) => void;
}
const DropDown = ({
	icon,
	label,
	options,
	selected,
	setSelected,
	open,
	setOpen,
	minWidth,
}: DropdownProps) => {
	const ref = useRef<HTMLUListElement>(null);
	useClickOutside(ref, () => {
		if (open) {
			setOpen(false);
		}
	});
	return (
		<div className=" items-center md:flex gap-2 ">
			<p className="text-p4 text-muted hidden md:block">{label}</p>
			<div className={`relative md:${minWidth} `}>
				<div
					className={` md:flex items-center gap-4 py-3 px-5 input-container ${
						open && "border-fg"
					} hidden `}
					onClick={() => setOpen(!open)}
				>
					<p className="text-p4 flex-1">{selected}</p>
					<IconCaretLeft
						className={`w-4 h-4 -rotate-90 fill-fg
                                    duration-200 ${open && "rotate-90! "} `}
					/>
				</div>
				<div
					className="md:hidden flex items-center justify-center w-5 h-5"
					onClick={() => setOpen(!open)}
				>
					{icon}
				</div>
				<AnimatePresence>
					{open && (
						<motion.ul
							ref={ref}
							initial="hidden"
							animate="show"
							exit="exit"
							variants={selectDropDownVariant}
							transition={{ duration: 0.3 }}
							className="absolute top-full right-0 mt-3 rounded-8 bg-bg min-w-[177px] z-50 flex-column max-h-[30vh] overflow-y-auto shadow-[0px_4px_10px] shadow-fg/25"
						>
							<li className="text-p4 px-5 md:hidden w-full py-2">{label}</li>
							{options.map((option) => (
								<motion.li
									key={option}
									className={`text-p4 cursor-pointer px-5 rounded-8 w-full py-2 ${
										option === selected
											? "font-bold bg-accent text-white"
											: "hover:bg-accent/80 hover:text-white"
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
