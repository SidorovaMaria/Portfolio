import { useScroll, useTransform, motion, useMotionValueEvent } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import Project from "./Project";
import { projects } from "../assets/constants";

const Projects = () => {
	const targetRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start end", "end start"],
	});
	const snapRefs = [useRef(null), useRef(null), useRef(null)];

	// Project 1
	const projectOneX = useTransform(scrollYProgress, [0, 0.25, 0.5], ["-100%", "50%", "-100%"]);
	const projectOneScale = useTransform(scrollYProgress, [0, 0.25, 0.5], [1, 1.5, 1]);

	// Project 2
	const projectTwoX = useTransform(scrollYProgress, [0.25, 0.5, 0.75], ["100%", "50%", "100%"]);
	const projectTwoScale = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [1, 1.5, 1]);

	// Project 3
	const projectThreeX = useTransform(scrollYProgress, [0.5, 0.75, 1], ["-100%", "50%", "-100%"]);
	const projectThreeScale = useTransform(scrollYProgress, [0.5, 0.75, 1], [1, 1.5, 1]);
	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		if (latest > 0.4) {
			console.log("hI");
		}
	});

	return (
		<section
			id="projects"
			ref={targetRef}
			className="relative h-[300vh] bg-[url('/images/background-projects.jpg')] bg-center bg-no-repeat "
		>
			{/* Snap zones */}

			<motion.div className="sticky top-0 left-0 flex flex-col items-center justify-center h-screen overflow-hidden bg-primary/50 backdrop-brightness-150 dark:backdrop-brightness-50 text-background ">
				<motion.div
					ref={snapRefs[0]}
					style={{ x: projectOneX, scale: projectOneScale }}
					className=" absolute will-change-transform"
				>
					<Project project={projects[0]} />
				</motion.div>
				<motion.div
					ref={snapRefs[1]}
					style={{ x: projectTwoX, scale: projectTwoScale }}
					className="absolute  will-change-transform"
				>
					<Project project={projects[1]} />
				</motion.div>
				{/* <motion.div
					ref={snapRefs[2]}
					style={{ x: projectThreeX, scale: projectThreeScale }}
					className="absolute will-change-transform"
				>
					<Project project={projects[0]} />
				</motion.div> */}
			</motion.div>
		</section>
	);
};

export default Projects;
