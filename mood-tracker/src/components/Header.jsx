import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoIcon from "../assets/images/logo.svg?react";
import ArrowDownIcon from "../assets/images/icon-dropdown-arrow.svg?react";
import { AnimatePresence, motion } from "motion/react";
import SettingsIcon from "../assets/images/icon-settings.svg?react";
import LogOutIcon from "../assets/images/icon-logout.svg?react";
import { logout } from "../redux/authSlice";
const Header = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const [openSettings, setOpenSettings] = useState(false);

	const byteArray = new Uint8Array(user.profileImg.data.data);
	const blob = new Blob([byteArray], { type: user.profileImg.contentType });
	const ImageUrl = URL.createObjectURL(blob);

	return (
		<header className="flex justify-between w-full items-center relative z-20">
			<LogoIcon />
			<div
				className="flex gap-2.5 items-center"
				onClick={() => setOpenSettings((prev) => !prev)}
			>
				<img src={ImageUrl} alt="Profile" className="w-10 h-10 rounded-full" />
				<ArrowDownIcon />
			</div>
			<AnimatePresence>
				{openSettings && (
					<motion.div
						key="settingsOptions"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 10 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.6, type: "spring" }}
						className="absolute top-full w-[343px] rounded-8 px-4 py-3 flex flex-col gap-3 shadow-[0px_5px_8px_rgba(33,33,77,0.6)] right-0 md:w-[200px]"
					>
						<div className="flex flex-col w-full gap-0.5">
							<p className="text-6 text-n-900">{user?.name}</p>
							<p className="text-7 text-n-300">{user?.email}</p>
						</div>
						<hr className="w-full border-blue-100" />
						<button
							className="flex gap-2.5 items-center"
							onClick={() => {
								// setOpenSettingsModal(true);
								setOpenSettings(false);
							}}
						>
							<SettingsIcon />
							<p className="text-7 text-n-900">Settings</p>
						</button>
						<button
							className="flex gap-2.5 items-center"
							onClick={() => dispatch(logout())}
						>
							<LogOutIcon />
							<p className="text-7 text-n-900">Logout</p>
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};

export default Header;
