"use client";

import { navlinks } from "./constants";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
	const pathname = usePathname();

	return (
		<nav className="fixed bottom-0 px-4 pt-2 bg-grey-900 w-full rounded-t-8 flex justify-between items-center md:px-10 lg:hiddenm z-50 ">
			{navlinks.map((link) => {
				const Icon = link.icon;
				const active = pathname === link.link;
				return (
					<Link
						href={link.link}
						key={link.title}
						aria-label={link.title}
						className={`flex flex-col gap-1 cursor-pointer items-center w-full pt-2 pb-3 rounded-t-8 justify-center group md:max-w-[104px]
                        ${active ? "bg-white border-b-4 border-b-secondary-green" : ""}`}
					>
						<span className="flex items-center justify-center w-6 h-6 p-0.5">
							<Icon
								className={`fill-grey-300 w-full h-auto
                                ${active ? "fill-secondary-green" : " group-hover:fill-grey-100"}`}
							/>
						</span>
						<p
							className={`hidden md:block text-5 font-bold text-grey-300 ${
								active ? "text-grey-900 " : " group-hover:text-grey-100"
							}`}
						>
							{link.title}
						</p>
					</Link>
				);
			})}
		</nav>
	);
};

export default NavBar;
