import { AnimatePresence, motion } from "motion/react";
import React, { useRef } from "react";
import { CategoryIcons, iconMap } from "./constants";
import { useClickOutside } from "@/lib/useClickOutside";
interface CategoryIconPickProps {
	open: boolean;
	setIcon: (i: keyof typeof iconMap) => void;
	close: () => void;
}
const CategoryIconPick = ({ open, setIcon, close }: CategoryIconPickProps) => {
	const ref = useRef<HTMLDivElement>(null!);
	useClickOutside(ref, close);
	return (
		<AnimatePresence>
			{open && (
				<motion.div
					ref={ref}
					initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
					animate={{ y: 0, scaleY: 1, opacity: 1 }}
					exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
					transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
					className="absolute top-full w-[200px] rounded-8 p-3 left-0 bg-bg  mt-4 z-50 shadow-[0px_4px_10px] shadow-fg/15 border border-fg/50 "
				>
					<div className="content-[''] absolute bottom-[97.5%] left-3 w-3 h-3 bg-bg border-l border-t border-fg/50 rotate-45" />
					<div className="grid grid-cols-4 gap-1 relative">
						{CategoryIcons.map((icon, index) => {
							const Icon = iconMap[icon];
							return (
								<div
									onClick={() => setIcon(icon)}
									key={index}
									className="flex items-center justify-center size-9 p-2 rounded-full hover:bg-accent cursor-pointer hover:text-white text-fg"
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
