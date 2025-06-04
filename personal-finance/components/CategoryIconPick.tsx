import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { CategoryIcons, iconMap } from "./constants";
interface CategoryIconPickProps {
	open: boolean;
	setIcon: (i: keyof typeof iconMap) => void;
}
const CategoryIconPick = ({ open, setIcon }: CategoryIconPickProps) => {
	return (
		<AnimatePresence>
			{open && (
				<motion.div className="absolute top-full w-[200px] rounded-8 p-3 -left-[10px] bg-white  mt-2 z-50 shadow-xs shadow-black">
					<div className="grid grid-cols-4 gap-1">
						{CategoryIcons.map((icon, index) => {
							const Icon = iconMap[icon];
							return (
								<div
									onClick={() => setIcon(icon)}
									key={index}
									className="flex items-center justify-center size-9 p-2 rounded-full hover:bg-secondary-green cursor-pointer text-grey-900
                                    hover:text-white"
								>
									<Icon className="" />
								</div>
							);
						})}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default CategoryIconPick;
