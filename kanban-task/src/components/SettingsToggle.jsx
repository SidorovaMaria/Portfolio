import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { ReactSVG } from "react-svg";

const SettingsToggle = ({ component, mode, open, className }) => {
	const [openSettings, setOpenSettings] = useState(false);
	return (
		<motion.div>
			<button className={`flex items-center justify-center h-4 cursor-pointer `}>
				<img
					src="/assets/icon-vertical-ellipsis.svg"
					onClick={() => setOpenSettings((prev) => !prev)}
				/>
			</button>
			<AnimatePresence>
				{openSettings && (
					<motion.div
						className={`absolute ${className} flex flex-col gap-1 max-w-[120px] md:max-w-[180px]`}
						initial="hidden"
						animate="show"
						exit="exit"
						key="settings"
						transition={{ type: "spring", duration: 0.5 }}
						variants={SettingsDropdownVariant}
					>
						<motion.button
							aria-label={`Edit ${mode}`}
							type="button"
							className=" cursor-pointer bg-white dark:bg-dark-grey text-s leading-m text-dark-grey/80 dark:text-white/80 hover:bg-purple hover:text-white py-2 px-4 w-full text-left border shadow-dark-grey/50 rounded-sm hover:shadow-none capitalize"
							onClick={() => {
								if (mode === "board") {
									open("edit");
								} else {
									open("edit", "", component);
								}

								setOpenSettings(false);
							}}
						>
							Edit {mode}
						</motion.button>
						<motion.button
							aria-label={`Delete ${mode}`}
							type="button"
							className="capitalize cursor-pointer  bg-white dark:bg-dark-grey text-s leading-m text-red hover:bg-red hover:text-white py-2 px-4 w-full text-left border shadow-red/50 rounded-sm hover:shadow-none"
							onClick={() => {
								if (mode === "board") {
									open("delete");
								} else {
									open("delete", "", component);
								}
								setOpenSettings(false);
							}}
						>
							Delete {mode}
						</motion.button>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default SettingsToggle;
const SettingsDropdownVariant = {
	hidden: { y: -50, scaleY: 0, opacity: 0 },
	show: { y: 0, scaleY: 1, opacity: 1 },
	exit: { y: -50, scaleY: 0, opacity: 0 },
};
