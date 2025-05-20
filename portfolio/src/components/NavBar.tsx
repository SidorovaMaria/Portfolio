import { Phone } from "lucide-react";
import FlipText from "../motionComponents/FlipText";
import { useEffect, useState } from "react";

const NavBar = () => {
	const [scroll, setScroll] = useState({
		scroll: window.scrollY,
		scrolledDirection: "",
	});
	useEffect(() => {
		const handleScroll = () => {
			const currentScroll = window.scrollY;
			const scrolledDirection = currentScroll > scroll.scroll ? "down" : "up";
			setScroll({ scroll: currentScroll, scrolledDirection });
		};
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [scroll.scroll]);
	const scrolled = scroll.scrolledDirection === "down" && scroll.scroll > 0;

	return (
		<header
			className={`fixed w-[95%] md:w-[95%] z-[100]
    flex items-center justify-between py-6 px-4 lg:mx-10
    backdrop-blur-xs transition-transform duration-600 ${
		scrolled ? "-translate-y-full" : "translate-y-0"
	} `}
		>
			<FlipText
				href="#hero"
				className="font-semibold tracking-widest text-center text-lg lg:text-xl"
			>
				Maria Sidorova
			</FlipText>
			<nav className="hidden md:flex">
				<ul className="flex gap-5 items-center text-sm ">
					<li className="nav-link group">
						<a href="#about-me">About Me</a>
						<span className="underline"></span>
					</li>
					<li className="nav-link group">
						Projects
						<span className="underline"></span>
					</li>
					<li className="nav-link group">
						Skills
						<span className="underline"></span>
					</li>
				</ul>
			</nav>
			<button className="nav-button relative group">
				<span className="btn-overlay"></span>
				<p className="z-20 ">Contact Me</p>
				<Phone className="size-4 fill-secondary z-10 bounce" />
			</button>
		</header>
	);
};

export default NavBar;
