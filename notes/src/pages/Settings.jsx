import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import LeftSide from "../layout/LeftSide";
import RightSide from "../layout/RightSide";
import { useIsDesktop } from "../app/hooks";
import SunIcon from "../assets/images/icon-sun.svg?react";
import FontIcon from "../assets/images/icon-font.svg?react";
import LockIcon from "../assets/images/icon-lock.svg?react";
import LogoutIcon from "../assets/images/icon-logout.svg?react";
import ColorTheme from "../components/ColorTheme";
import FontTheme from "../components/FontTheme";
const Settings = () => {
	const [selectedSetting, setSelectedSetting] = useState(null);
	const isDesktop = useIsDesktop();
	const hasMounted = useRef(false);
	useEffect(() => {
		if (!hasMounted.current) {
			hasMounted.current = true;
		}
	}, []);
	const renderSettings = (setting) => {
		switch (setting) {
			case "color":
				return <ColorTheme />;

			case "font":
				return <FontTheme />;

			default:
				return null;
		}
	};
	return (
		<motion.section className="flex">
			<AnimatePresence>
				{(isDesktop || selectedSetting === null) && (
					<LeftSide
						className="relative"
						selected={selectedSetting}
						disableInitialAnimation={hasMounted.current}
					>
						<h1 className="text-1 lg:hidden ">Settings </h1>
						<div className="flex flex-col gap-2 py-2 w-full  ">
							<button
								className="flex items-center gap-2 rounded-4 py-2 setting-btn arrow-right"
								onClick={() => setSelectedSetting("color")}
							>
								<SunIcon />
								<p className="text-4">Color Theme</p>
							</button>
							<button
								className="flex items-center gap-2 rounded-4 py-2 setting-btn arrow-right"
								onClick={() => setSelectedSetting("font")}
							>
								<FontIcon />
								<p className="text-4">Font Theme</p>
							</button>
							<button className="flex items-center gap-2 rounded-4 py-2 setting-btn arrow-right">
								<LockIcon />
								<p className="text-4">Change Password</p>
							</button>
							<hr className="border-n-200 dark:border-n-800" />
							<button className="flex items-center gap-2 rounded-4 py-2 setting-btn arrow-right">
								<LogoutIcon />
								<p className="text-4">Logout </p>
							</button>
						</div>
					</LeftSide>
				)}
			</AnimatePresence>
			{selectedSetting && (
				<RightSide keyModal={selectedSetting}>{renderSettings(selectedSetting)}</RightSide>
			)}
		</motion.section>
	);
};

export default Settings;
