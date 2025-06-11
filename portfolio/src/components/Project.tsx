import ProjectPhotoGallery from "./ProjectPhotoGallery";
import { motion } from "motion/react";
interface ProjectProps {
	project: {
		project: string;
		images: { src: string; alt: string; device: string }[];
		description: string;
		tags: string[];
		link: string;
		github: string;
		inProgress?: boolean;
	};
	clasName?: string;
}
const Project = ({ project }: ProjectProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ amount: 0.5, once: true }}
			transition={{ type: "spring", duration: 2.5 }}
			className=" flex flex-col gap-5 "
		>
			<ProjectPhotoGallery images={project.images} />
			<div className="flex w-full flex-col gap-1">
				<h2 className="text-2xl font-semibold text-center">{project.project}</h2>
				<p className="text-center text-secondary/70 text-sm italic tracking-wide ">
					{project.description}
				</p>
				{project.inProgress && (
					<p className="text-center text-red-500! text-xs italic tracking-wide">
						<span className="font-bold">In Progress</span> - this project is still in
						progress to be better.
					</p>
				)}
			</div>
			<div className="flex justify-end items-center gap-2 mr-12">
				{project.tags.map((tag, index) => (
					<motion.span
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						key={index}
						className="text-xs font-semibold text-coffe-light cursor-pointer bg-coffee-brown/20 rounded-full px-2 py-1 hover:bg-coffe-light hover:text-secondary transition-all duration-300 ease-linear"
					>
						{tag}
					</motion.span>
				))}
			</div>
		</motion.div>
	);
};

export default Project;
