"use client";

import { navlinks } from "./constants";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
	const pathname = usePathname();

	return (
		<nav className="fixed bottom-0 px-4 pt-2  bg-fg dark:bg-bg border-t dark:border-fg/50 w-full rounded-t-8 flex justify-between items-center md:px-10 lg:hidden z-50 ">
			{navlinks.map((link) => {
				const Icon = link.icon;
				const active = pathname === link.link;

				return (
					<Link
						href={link.link}
						key={link.title}
						aria-label={link.title}
						className={`flex flex-col gap-1 cursor-pointer items-center w-full pt-2 pb-3 rounded-t-8 justify-center group md:max-w-[104px]
                        ${active ? "bg-bg dark:bg-fg border-b-4 border-b-secondary-green" : ""}`}
					>
						<span className="flex items-center justify-center w-6 h-6 p-0.5">
							<Icon
								className={`fill-muted-alt dark:fill-muted w-full h-auto
                                    ${
										active
											? "fill-accent!"
											: "group-hover:fill-bg dark:group-hover:fill-fg"
									}`}
							/>
						</span>
						<p
							className={`hidden md:block text-p5-bold text-muted-alt dark:text-muted ${
								active
									? "text-fg! dark:text-bg! "
									: "group-hover:text-bg dark:group-hover:text-fg"
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
