"use client";
import Image from "next/image";
import React, { useState } from "react";
import { navlinks } from "./constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { p } from "motion/react-client";
import IconCaretLeft from "./svg/IconCaretLeft";
import IconMinimizeMenu from "./svg/IconMinimizeMenu";

const DesktopNavBar = () => {
	const pathname = usePathname();
	const [minimizeNavBar, setMinimizeNavBar] = useState(false);
	return (
		<motion.nav
			initial={{ width: "300px" }}
			animate={minimizeNavBar ? "minimized" : "full"}
			variants={DesktopNavBarVariants}
			className="hidden lg:flex flex-col min-h-screen
    gap-6 pb-6 rounded-r-16
     bg-grey-900 "
		>
			{/* Icon */}

			<AnimatePresence mode="popLayout">
				{!minimizeNavBar ? (
					<motion.div
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="flex items-center px-8 py-10 gap-2"
					>
						<Image
							src={"/logo-large.svg"}
							priority
							alt="Logo"
							width={121}
							height={22}
							className="w-[121px] h-[22px]"
						/>
					</motion.div>
				) : (
					<motion.div
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="flex items-center px-8 py-10 gap-2"
					>
						<Image
							src={"/logo-small.svg"}
							alt="Logo"
							width={40}
							height={22}
							className="w-10 h-[22px]"
						/>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Navigation */}

			<motion.ul className="flex flex-1 flex-col gap-1 pr-6 w-full">
				{navlinks.map((link) => {
					const Icon = link.icon;
					const active = pathname === link.link;
					return (
						<motion.li
							animate={minimizeNavBar ? "hide" : "show"}
							variants={LinkVariant}
							key={link.title}
							className={`w-full rounded-r-12 flex gap-4 items-center justify-start transition-all duration-300 group py-4  ${
								active && "bg-white"
							}
                            ${minimizeNavBar ? "px-6 " : "px-8 "}  `}
						>
							<span className="flex items-center justify-center min-w-6 min-h-6 p-0.5">
								<Icon
									className={`fill-grey-300 w-full h-auto
                                ${active ? "fill-secondary-green" : " group-hover:fill-grey-100"}`}
								/>
							</span>
							<motion.p
								variants={navText}
								className={`hidden md:block text-3 font-bold  text-grey-300 ${
									active ? "text-grey-900 " : " group-hover:text-grey-100"
								}`}
							>
								{link.title}
							</motion.p>
						</motion.li>
					);
				})}
			</motion.ul>

			<motion.button
				animate={minimizeNavBar ? "hide" : "show"}
				variants={LinkVariant}
				title={`${minimizeNavBar ? "Expand Menu" : "Minimize Menu"}`}
				onClick={() => setMinimizeNavBar(!minimizeNavBar)}
				className="btn btn-tertiary w-full px-8 py-4 group "
			>
				<motion.span variants={MinimizeIconVariants}>
					<IconMinimizeMenu className="fill-grey-300 min-w-5 min-h-5 group-hover:fill-grey-100" />
				</motion.span>
				<motion.p
					variants={navText}
					className="text-3 font-bold text-grey-300 group-hover:text-grey-100 gap-4"
				>
					Minimize Menu
				</motion.p>
			</motion.button>
		</motion.nav>
	);
};

export default DesktopNavBar;
const DesktopNavBarVariants = {
	full: {
		width: "300px",
		transition: { duration: 0.3 },
	},
	minimized: {
		width: "80px",
		transition: { duration: 0.3 },
	},
};
const LinkVariant = {
	show: {
		width: "100%",
		transition: { duration: 0.3 },
	},
	hide: {
		width: "60px",
		transition: { duration: 0.3 },
	},
};
const navText = {
	hide: {
		opacity: 0,

		transition: {
			duration: 0.3,
		},
	},
	show: {
		opacity: 1,
		transition: { duration: 0.3 },
	},
};
const MinimizeIconVariants = {
	show: {
		rotate: 0,
		transition: { duration: 0.3 },
	},
	hide: {
		rotate: 180,
		transition: { duration: 0.3 },
	},
};
