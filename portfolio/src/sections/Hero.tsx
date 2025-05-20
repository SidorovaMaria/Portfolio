import React, { useEffect, useState } from "react";
import { heroTags } from "../constants";
import HeroModel from "../models/hero-model/HeroModel";
import { AnimatePresence, motion } from "motion/react";
const Hero = () => {
	const [userName, setUserName] = useState("");
	const [heroTagIndex, setheroTagIndex] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setheroTagIndex((prev) => (prev + 1) % heroTags.length);
		}, 2500);
		return () => clearInterval(interval);
	});
	return (
		<section id="hero" className=" hero-img hero-layout">
			<div className="relative w-full  ">
				{/* Left Side */}
				<div className="flex flex-col gap-2 md:gap-4  md:max-w-[70%] lg:max-w-[40%] md:px-4 px-2">
					<h1 className="text-[22px] md:text-[40px] font-semibold leading-[140%] max-w-7/10 md:max-w-full capitalize ">
						Fuelled by coffee and creativity, I turn
						<span className="flex-col absolute px-3 max-h-[50px] overflow-hidden inline-block">
							<AnimatePresence mode="wait">
								<motion.span
									key={heroTags[heroTagIndex].text}
									className="flex items-center gap-2"
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: -20, opacity: 0 }}
									transition={{ duration: 0.5 }}
								>
									<div className="flex-center p-2 bg-coffee-brown rounded-full">
										{heroTags[heroTagIndex].icon &&
											React.createElement(heroTags[heroTagIndex].icon, {
												className: "w-5 h-5 text-secondary",
											})}
									</div>
									{heroTags[heroTagIndex].text}
								</motion.span>
							</AnimatePresence>
						</span>
						<br />
						into seamless web experiences.
					</h1>
					<p className="italic ">
						Hi, I Am Maria - junior front-end Developer, based in Liverpool, United
						Kingdom{" "}
					</p>
				</div>

				<figure>
					<div className="absolute w-full h-full min-h-[40vh] md:min-h-[50vh] lg:-top-10 lg:right-20 lg:w-1/2  ">
						<HeroModel name={userName} />
					</div>
				</figure>
				<motion.div className="absolute py-2 flex flex-col gap-1 md:gap-2  max-w-1/3 md:max-w-1/4 w-full lg:top-0 items-start right-0 md:right-6 lg:right-0 lg:items-end">
					<p className="text-xs font-bold text-center">Try Entering your Name!</p>

					<div className="relative ">
						<motion.input
							animate={{ y: [10, 0, 10] }}
							transition={{
								duration: 2,
								repeat: Infinity,
								repeatType: "reverse",
								type: "tween",
							}}
							whileFocus={{ y: 0 }}
							className="hero-name-input text-xs md:text-base w-full"
							value={userName}
							type="text"
							onChange={(e) => setUserName(e.target.value)}
						/>
						<motion.div
							animate={{ y: [10, 0, 10] }}
							transition={{
								duration: 2,
								repeat: Infinity,
								repeatType: "reverse",
								type: "tween",
							}}
							className="absolute top-1/2 -translate-y-1/2 flex gap-1 left-3 font-bold"
						>
							{userName.length === 0 && (
								<>
									{[0, 1, 2].map((i) => (
										<motion.span
											key={i}
											animate={{ opacity: [0, 1, 0] }}
											transition={{
												duration: 2,
												delay: i * 0.6,
												repeat: Infinity,
												repeatType: "loop",
												ease: "easeInOut",
											}}
										>
											•
										</motion.span>
									))}
								</>
							)}
						</motion.div>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
