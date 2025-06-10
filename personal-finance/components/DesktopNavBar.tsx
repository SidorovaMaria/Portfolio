"use client";
import Image from "next/image";
import React, { useState } from "react";
import { navlinks } from "./constants";
import { usePathname, useRouter } from "next/navigation";

import { AnimatePresence, motion } from "motion/react";

import IconMinimizeMenu from "./svg/IconMinimizeMenu";
import {
	DesktopNavBarVariants,
	LinkVariant,
	MinimizeIconVariants,
	navText,
} from "./constants/motionVariants";

const DesktopNavBar = () => {
	const router = useRouter();
	const pathname = usePathname();
	const [minimizeNavBar, setMinimizeNavBar] = useState(false);
	return (
		<motion.nav
			initial={{ width: "300px" }}
			animate={minimizeNavBar ? "minimized" : "full"}
			variants={DesktopNavBarVariants}
			className="hidden lg:flex flex-col min-h-screen
    gap-6 pb-6 rounded-r-16 bg-fg dark:bg-bg border-r dark:border-fg
    "
		>
			{/* Icon */}

			<AnimatePresence mode="popLayout">
				{!minimizeNavBar ? (
					<motion.div
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="flex items-center px-8 py-10 gap-2 "
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
							onClick={() => router.push(link.link)}
							className={`cursor-pointer w-full rounded-r-12 flex gap-4 items-center justify-start transition-all duration-300 group py-4  ${
								active && "bg-bg dark:bg-fg"
							}
                            ${minimizeNavBar ? "px-6 " : "px-8 "}  `}
						>
							<span className="flex items-center justify-center min-w-6 min-h-6 p-0.5">
								<Icon
									className={`fill-muted-alt dark:fill-muted w-full h-auto
                                ${
									active
										? "fill-accent! "
										: "group-hover:fill-bg dark:group-hover:fill-fg"
								}`}
								/>
							</span>
							<motion.p
								variants={navText}
								className={`hidden md:block text-3 font-bold text-muted-alt dark:text-muted  ${
									active
										? "text-fg! dark:text-bg!"
										: " group-hover:text-bg dark:group-hover:text-fg"
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
				className="btn btn-tertiary w-full px-8 py-4 group rounded-r-12 flex items-center gap-4 justify-start transition-all duration-300"
			>
				<motion.span variants={MinimizeIconVariants}>
					<IconMinimizeMenu className="fill-muted-alt dark:fill-muted min-w-5 min-h-5 group-hover:fill-bg dark:group-hover:fill-fg" />
				</motion.span>
				<motion.p
					variants={navText}
					className="text-3 font-bold text-muted-alt dark:text-muted group-hover:text-bg dark:group-hover:text-fg"
				>
					Minimize Menu
				</motion.p>
			</motion.button>
		</motion.nav>
	);
};

export default DesktopNavBar;
