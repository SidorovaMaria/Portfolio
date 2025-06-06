import React, { useRef, useState } from "react";
import IconEllipsis from "./svg/IconEllipsis";
import { AnimatePresence, motion } from "motion/react";
import { useClickOutside } from "@/lib/useClickOutside";
export type Option = {
	label: string;
	option: () => void;
};
interface OptionBtnProps {
	options: Option[];
}

const OptionBtn = ({ options }: OptionBtnProps) => {
	const [openOptions, setOpenOptions] = useState(false);
	const toggleOptions = () => {
		setOpenOptions((prev) => !prev);
	};
	const ref = useRef<HTMLUListElement>(null);
	useClickOutside(ref, () => {
		if (openOptions) {
			setOpenOptions(false);
		}
	});

	return (
		<div className="relative" id="option-btn-container">
			{/* Original Btn */}
			<button className="size-4 flex-center cursor-pointer group" onClick={toggleOptions}>
				<IconEllipsis className="w-4 fill-muted-alt group-hover:fill-muted duration-300 transition-color group-hover:scale-110" />
			</button>
			<AnimatePresence>
				{openOptions && (
					<motion.ul
						ref={ref}
						initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
						animate={{ y: 0, scaleY: 1, opacity: 1 }}
						exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
						transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
						className="absolute top-full mt-2 right-0 bg-bg rounded-8 w-max shadow-[0px_4px_24px] shadow-bg/25 border border-fg/50 origin-top overflow-hidden z-30"
					>
						{options.map((option, index) => (
							<motion.li
								key={index}
								onClick={() => {
									option.option();
									setOpenOptions(false);
								}}
								className={`text-p4-bold cursor-pointer text-fg ${
									option.label.toLowerCase().includes("delete")
										? "text-danger! hover:bg-danger hover:text-white! "
										: "hover:bg-accent hover:text-white!"
								} px-4 py-3`}
							>
								{option.label}
							</motion.li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
};

export default OptionBtn;
