import React, { useState } from "react";
import IconEllipsis from "./svg/IconEllipsis";
import { AnimatePresence, motion } from "motion/react";
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

	return (
		<div className="relative" id="option-btn-container">
			{/* Original Btn */}
			<button
				className="w-4 h-4 flex items-center justify-center cursor-pointer group"
				onClick={toggleOptions}
			>
				<IconEllipsis className="w-4 fill-grey-300 group-hover:fill-grey-500 duration-300 transition-color group-hover:scale-110" />
			</button>
			<AnimatePresence>
				{openOptions && (
					<motion.ul
						initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
						animate={{ y: 0, scaleY: 1, opacity: 1 }}
						exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
						transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
						className="absolute top-full mt-2 right-0 bg-white rounded-8 w-max shadow-[0px_4px_24px_rgba(0,0,0,0.25)] origin-top overflow-hidden z-30"
					>
						{options.map((option, index) => (
							<motion.li
								key={index}
								onClick={() => {
									option.option();
									setOpenOptions(false);
								}}
								className={`text-4 leading-150 font-medium cursor-pointer hover:text-white   ${
									option.label.toLowerCase().includes("delete")
										? "text-secondary-red hover:bg-secondary-red! "
										: "hover:bg-secondary-green/50"
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
