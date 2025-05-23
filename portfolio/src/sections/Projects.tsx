import { Code } from "lucide-react";

import FlipText from "../motionComponents/FlipText";
import { projects } from "../constants";
import Project from "../components/Project";

const Projects = () => {
	return (
		<section id="projects" className="projects-layout flex flex-col gap-10 w-full">
			<h2 className="flex items-center gap-2.5 group">
				<FlipText className="text-3xl lg:text-[40px] uppercase font-bold py-0 leading-[140%]">
					Shots Of Code
				</FlipText>
				<Code className="size-7 lg:size-10 text-coffe-light group-hover:text-secondary transition-all duration-900 ease-linear " />
			</h2>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-16">
				{projects.map((project, index) => (
					<Project project={project} key={index} clasName="" />
				))}
			</div>
		</section>
	);
};

export default Projects;
